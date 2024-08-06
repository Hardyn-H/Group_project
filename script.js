const homeLink = document.getElementById("home-link");
const addRecipeLink = document.getElementById("add-recipe-link");
const recipesLink = document.getElementById("recipes-link");
const homeTab = document.getElementById("home");
const addRecipeTab = document.getElementById("add-recipe");
const recipesTab = document.getElementById("recipes");
const recipeList = document.getElementById("recipe-list");
const searchQuery = document.getElementById("search-query");
const categoryFilter = document.getElementById("category-filter");

let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

homeLink.addEventListener("click", () => showTab(homeTab));
addRecipeLink.addEventListener("click", () => showTab(addRecipeTab));
recipesLink.addEventListener("click", () => showTab(recipesTab));

function showTab(tab) {
  homeTab.style.display = "none";
  addRecipeTab.style.display = "none";
  recipesTab.style.display = "none";
  tab.style.display = "block";

  if (tab === recipesTab) {
    displayRecipes(recipes);
  }
}

function addRecipe() {
  const title = document.getElementById("recipe-title").value.trim();
  const ingredients = document.getElementById("recipe-ingredients").value.trim();
  const instructions = document.getElementById("recipe-instructions").value.trim();
  const category = document.getElementById("recipe-category").value;
  const image = document.getElementById("recipe-image").value.trim();

  if (!title || !ingredients) {
    alert("Title and Ingredients are required!");
    return;
  }

  const newRecipe = {
    id: new Date().getTime(),
    title,
    ingredients,
    instructions,
    category,
    image,
  };

  recipes.push(newRecipe);

  localStorage.setItem("recipes", JSON.stringify(recipes));

  document.getElementById("recipe-title").value = "";
  document.getElementById("recipe-ingredients").value = "";
  document.getElementById("recipe-instructions").value = "";
  document.getElementById("recipe-category").value = "Breakfast";
  document.getElementById("recipe-image").value = "";

  alert("Recipe added successfully!");
  showTab(recipesTab);
}

function displayRecipes(recipesToDisplay) {
  recipeList.innerHTML = "";

  recipesToDisplay.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";

    recipeCard.innerHTML = `
      <h3>${recipe.title}</h3>
      ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.title}">` : ""}
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      <p><strong>Category:</strong> ${recipe.category}</p>
      <button class="edit-btn" onclick="editRecipe(${recipe.id})">Edit</button>
      <button class="delete-btn" onclick="deleteRecipe(${recipe.id})">Delete</button>
    `;

    recipeList.appendChild(recipeCard);
  });
}

function editRecipe(id) {
  const recipe = recipes.find((recipe) => recipe.id === id);

  if (!recipe) return;

  document.getElementById("recipe-title").value = recipe.title;
  document.getElementById("recipe-ingredients").value = recipe.ingredients;
  document.getElementById("recipe-instructions").value = recipe.instructions;
  document.getElementById("recipe-category").value = recipe.category;
  document.getElementById("recipe-image").value = recipe.image;

  deleteRecipe(id);
  showTab(addRecipeTab);
}

function deleteRecipe(id) {
  recipes = recipes.filter((recipe) => recipe.id !== id);
  localStorage.setItem("recipes", JSON.stringify(recipes));
  displayRecipes(recipes);
}

function searchRecipes() {
  const query = searchQuery.value.toLowerCase();

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(query) ||
    recipe.ingredients.toLowerCase().includes(query)
  );

  displayRecipes(filteredRecipes);
}

function filterByCategory() {
  const category = categoryFilter.value;

  const filteredRecipes = category
    ? recipes.filter((recipe) => recipe.category === category)
    : recipes;

  displayRecipes(filteredRecipes);
}

showTab(homeTab);
