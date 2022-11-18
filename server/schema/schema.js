
const Recipe = require('../models/Recipe')
const Ingredient = require('../models/Ingredient')
const User = require('../models/User')


const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLSchema, GraphQLList, GraphQLEnumType, GraphQLInputObjectType} = require('graphql')

const unit = new GraphQLEnumType({
    name: 'Unit',
    values: {
        'g': {value: 'Gramm'},
        'ml': {value: 'Milliliter'},
        'tbsp': {value: 'Tablespoon'},
        'tsp': {value: 'Teaspoon'},
        'aq': {value: 'Absolute Quantity'}
    }
    })

const allergytypes = new GraphQLEnumType({
    name: 'AllergyTypes',
    values: {
        'ag': {value: 'Gluten'},
        'al': {value: 'Lactose'},
        'an': {value: 'Nuts'},
        'nn': {value: 'None'}
    }
})

const IngredientInputType = new GraphQLInputObjectType({
    name: 'IngredientInput',
    fields: () => ({
        ingredientid: { type: GraphQLID },
        amount: { type: GraphQLInt }
    })
})
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        favRecipes:{type: new GraphQLList(RecipeType),
        resolve(parent, args){
           let temp = []
            parent.favRecipes.forEach(e => {
                temp.push(Recipe.findById(e))
            })
            return temp
         
        }},
        allergyType:{type: new GraphQLList(GraphQLString)},
        myPantry:{type: new GraphQLList(IngredientType)},
    })
})
const IngredientsType = new GraphQLObjectType({
    name: 'Ingredients',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        unit: {type: GraphQLString},
        salesunit: {type: GraphQLInt},
        allergytype: {type: GraphQLString}
     })
})

const IngredientType = new GraphQLObjectType({
    name: 'Ingredient',
    fields: () => ({
        type: {
            type: IngredientsType,
            resolve(parent, args){
                return Ingredient.findById(parent.ingredientid)
            }
        },
        amount: { type: GraphQLInt}
})
})

const RecipeType = new GraphQLObjectType({
    name: 'Recipe',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        steps: {type:GraphQLString},
        kcal: {type: GraphQLInt},
        diff: {type: GraphQLString},
        time: {type: GraphQLInt},
        ingredients: {type: new GraphQLList(IngredientType)}
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ingredients: {
            type: new GraphQLList(IngredientsType),
            resolve(parent, args){
                return Ingredient.find()
            }
        },
        all_recipes: {
            type: new GraphQLList(RecipeType),
            resolve(parent, args){
                return Recipe.find()
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find()
            }
        }
    }
})



const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //Ingridient Querys
        addIngredient:{
            type: IngredientsType,
            args:  {
                name: {type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)},
                unit: {type: unit, defaultValue: 'Gramm'},
                allergytype: {type: allergytypes, defaultValue: 'None'},
                salesunit: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,  args) {
                const ingredient = new Ingredient({
                    name: args.name,
                    description: args.description,
                    unit: args.unit,
                    salesunit: args.salesunit,
                    allergyType: args.allergytype
                })
                return ingredient.save()
            }
    },
        addRecipe:  {
            type: RecipeType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                kcal: {type: GraphQLNonNull(GraphQLInt)},
                steps: {type: GraphQLString},
                diff: {type: GraphQLNonNull(GraphQLInt)},
                time: {type: GraphQLNonNull(GraphQLInt)},
                ingredients: {type: GraphQLList(IngredientInputType)}
            },
            resolve(parent, args){
                const recipe = new Recipe({
                    name: args.name,
                    steps: args.steps,
                    kcal: args.kcal,
                    diff: args.diff,
                    time: args.time,
                    ingredients: args.ingredients
                })
                return recipe.save()
            }
    },
        addUser: {
            type: UserType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                favRecipes:{type: new GraphQLList(GraphQLID)},
                allergyType:{type: new GraphQLList(allergytypes), defaultValue: 'None'},
                myPantry:{type: new GraphQLList(IngredientInputType)},

            },
            resolve(parent, args){
                const user = new User({
                    name: args.name,
                    favRecipes: args.favRecipes,
                    allergyType: args.allergyType,
                    myPantry: args.myPantry
                })
                return user.save()
            }
        }

    
    
}
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})