const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  ingredients: { type: String, required: true, trim: true },
  instructions: { type: String, required: true, trim: true },
  prep_time: { type: String, required: true, trim: true },
}, {
  timestamps: true
});

const RecipeModel = mongoose.model("Recipe", recipeSchema);

module.exports = RecipeModel;