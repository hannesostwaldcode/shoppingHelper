import {gql} from 'graphql-tag'


const ADD_USER = gql`
    mutation addUser($name: String!, $allergyType: [AllergyTypes]!, $myPantry: [IngredientInput]!, $favRecipes: [ID]!)
    {addUser(name: $name, allergyType: $allergyType, myPantry: $myPantry, favRecipes: $favRecipes)
        {
            name
        }

    }

`

export {ADD_USER}