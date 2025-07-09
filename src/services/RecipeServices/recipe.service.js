const mongoose = require("mongoose");
const RecipeModel = require("../../models/Recipe.model");

class RecipeService {
    static async fetchAllRecipes(page, limit, search, sort) {
        try {
            let searchTerm = {}
            if (search !== '' && search) {
                searchTerm = {name: { $regex: '.*' + search + '.*' } }
            }
            const skip = (page - 1) * limit;
            const result = await RecipeModel.find(searchTerm).skip(skip).limit(limit).sort({ timestamp: sort })
            const totalDocuments = await RecipeModel.countDocuments();
            const totalPages = Math.ceil(totalDocuments / limit);
            return {
                result,
                totalDocuments, 
                totalPages
            }
        } catch (err) {
            console.log("Error in fetchAllRecipes : ", err);
            throw Error(err)
        }
    }

    static async fetchRecipeById(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return null
            }
            const result = await RecipeModel.findOne({ _id: id })
            return result
        } catch (err) {
            console.log("Error in fetchRecipeById : ", err.message);
            throw Error(err)
        }
    }

    static async createRecipe(recipeData) {
        try {
            const recipeAlreadyExist = await RecipeModel.findOne({ name: recipeData.name })
            if (recipeAlreadyExist) {
                return null
            }
            const result = await RecipeModel.create(recipeData)
            return result
        } catch (err) {
            console.log("Error in createRecipe : ", err);
            throw Error(err)
        }
    }

    static async updateRecipe(recipeData) {
        try {
            if (!mongoose.Types.ObjectId.isValid(recipeData._id)) {
                return null
            }
            const recipeExist = await RecipeModel.find({ _id: recipeData._id })
            if (!recipeExist) {
                return null
            }
            const result = RecipeModel.findOneAndUpdate({ _id: recipeData._id }, {
                $set: {...recipeData}
            })
            return result
        } catch (err) {
            console.log("Error in updateRecipe : ", err);
            throw Error(err)
        }
    }

    static async deleteRecipe(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return null
            }
            const recipeDelete = await RecipeModel.findOneAndDelete({ 
                _id: id,
            })
            return recipeDelete
        } catch (err) {
            console.log("Error in deleteRecipe : ", err);
            throw Error(err)
        }
    }
} 

module.exports = RecipeService