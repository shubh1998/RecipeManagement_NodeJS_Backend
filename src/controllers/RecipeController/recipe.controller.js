const RecipeService = require("../../services/RecipeServices/recipe.service");
const { checkMandatoryFields } = require("../../utils");

class RecipeController { 
    static getAllRecipes = async (req, res) => {
        try {
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)
            const search = req.query.search || null
            const sort = req.query.sort || 'desc'
            if (!page || !limit) return badRequestError(res, 'Missing params - page, limit')
            const result = await RecipeService.fetchAllRecipes(page, limit, search, sort)
            return okResponse(res, result, 'Recipes fetched successfully !'); 
        } catch (error) {
            return internalServerError(res)
        }
    }  
    
    static getRecipeById = async (req, res) => {
        try {
            const recipeId = req.params.id
            const result = await RecipeService.fetchRecipeById(recipeId)
            if (!result) {
                return badRequestError(res, 'Recipe not found with given id : ' + recipeId)
            }
            return okResponse(res, result, 'Recipe fetched successfully !'); 
        } catch (error) {
            return internalServerError(res)
        }
    }  

    static addRecipe = async (req, res) => {
        try {
            const recipeData = req.body
            const missingFields = checkMandatoryFields(
                recipeData, 
                ['name', 'ingredients', 'instructions', 'prep_time']
            )
            if (missingFields.length) {
                return badRequestError(res, "Missing fields : " + missingFields)
            }
            const result = await RecipeService.createRecipe(recipeData)   
            if (!result) {
                return badRequestError(res, 'Recipe already created wit given name !')
            }         
            return okResponse(res, result, 'Recipe created successfully !'); 
        } catch (error) {
            return internalServerError(res)
        }
    }

    static updateRecipeById = async (req, res) => {
        try {
            const recipeData = req.body
            if (!recipeData._id) {
                return badRequestError(res, "Missing recipe id field : _id")
            }
            const result = await RecipeService.updateRecipe(recipeData)
            
            if (!result) {
                return badRequestError(res, 'Recipe not exist with given id : ' + recipeData._id )
            }
            
            return okResponse(res, result, 'Recipe updated successfully !'); 
        } catch (error) {
            return internalServerError(res)
        }
    } 
    
    static deleteRecipeById = async (req, res) => {
        try {
            const recipeId = req.params.id
            const result = await RecipeService.deleteRecipe(recipeId)
            if (!result) {
                return badRequestError(res, 'Recipe not found with given id : ' + recipeId)
            }
            return okResponse(res, result, 'Recipe deleted successfully !'); 
        } catch (error) {
            return internalServerError(res)
        }
    } 
}   

module.exports = RecipeController