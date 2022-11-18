const mongoose = require('mongoose')

const ingredientAmount = new mongoose.Schema({
    ingredientid: mongoose.Schema.Types.ObjectId, 
    amount: Number
} ,{_id: false})

const UserSchema = new mongoose.Schema({
    name:{
        type: String
    },
    favRecipes:{
        type: [mongoose.Schema.Types.ObjectId]
    },
    allergyType: {
        type: [String],
        enum: ['Gluten', 'Lactose', 'Nuts', 'None']
    },
    myPantry: [ingredientAmount]
    

})

module.exports = mongoose.model('User', UserSchema)