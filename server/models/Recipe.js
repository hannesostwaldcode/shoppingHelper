const mongoose = require('mongoose')

const ingredientAmount = new mongoose.Schema({
    ingredientid: mongoose.Schema.Types.ObjectId, 
    amount: Number
} ,{_id: false})

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    steps: {
        type: String,
    },
    kcal: {
        type: Number,
    },
    diff: {
        type: Number
    },
    time: {
        type: Number
    },
    ingredients: [ingredientAmount]
})

module.exports  = mongoose.model('Recipe', RecipeSchema)