import {gql} from 'graphql-tag'


const ADD_INGREDIENT = gql`
    mutation addIngredient($name: String!, $description: String!, $unit: Unit!, $salesunit: Int!, $allergytype: AllergyTypes!)
   { addIngredient(name: $name,description: $description,unit: $unit,salesunit: $salesunit,allergytype: $allergytype)
    {
        name
        description
        unit
        salesunit
        allergytype
    }
   }
`

export {ADD_INGREDIENT}