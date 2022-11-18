import {gql} from 'graphql-tag'


const ADD_RECIPE = gql`
    mutation addRecipe($name: String!, $steps: String!, $ingredients: [IngredientInput]!, $kcal: Int!, $diff: Int!, $time: Int!)
    {addRecipe(name: $name, steps: $steps, ingredients: $ingredients, kcal: $kcal, diff: $diff, time: $time)
        {
            name
            steps
            ingredients{
                type{
                    name
                    }
                amount
                    }
        }

    }

`

export {ADD_RECIPE}