const mongoose = require('mongoose')

const IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    unit: {
        type: String,
        enum: ['Gramm', 'Milliliter', 'Tablespoon', 'Teaspoon', 'Absolute Quantity'],
    },
    salesunit: {
        type: Number,
    },
    allergyType: {
        type: String,
        enum: ['Gluten', 'Lactose', 'Nuts', 'None']
    },
})

module.exports  = mongoose.model('Ingredient', IngredientSchema)