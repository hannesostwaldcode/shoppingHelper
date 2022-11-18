const {faker} = require('@faker-js/faker')
const Ingredient = require('./models/Ingredient')

const UnitArry =  ['Gramm', 'Milliliter', 'Tablespoon', 'Teaspoon', 'Absolute Quantity']
const allergyArray = ['Gluten', 'Lactose', 'Nuts', 'None']
const datagen = (togen)  => {

    for(let i = 0; i < togen; i++){

        tempIngredient = new Ingredient({
            name: faker.animal.fish(),
            description: faker.lorem.lines(2),
            unit: UnitArry[Math.floor(Math.random()* UnitArry.length)],
            salesunit: faker.datatype.number({max: 200}),
            allergyType: allergyArray[Math.floor(Math.random()* allergyArray.length)]
        })

        tempIngredient.save()

    }
    
}

module.exports = datagen;