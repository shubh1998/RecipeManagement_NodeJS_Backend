const RecipeController = require("../controllers/RecipeController/recipe.controller");

const recipeRoutes = require("express").Router();

recipeRoutes.get('/recipes', RecipeController.getAllRecipes)
recipeRoutes.get('/recipe/:id', RecipeController.getRecipeById)
recipeRoutes.post('/add-recipe', RecipeController.addRecipe)
recipeRoutes.patch('/update-recipe', RecipeController.updateRecipeById)
recipeRoutes.delete('/recipe/:id', RecipeController.deleteRecipeById)

module.exports = recipeRoutes
