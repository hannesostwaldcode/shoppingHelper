import {gql} from 'graphql-tag'

const ALL_INGREDIENT_QUERY = gql`
    query 
            {ingredients{
    name
    id
    unit
    description
    allergytype
    }
}`;

export {ALL_INGREDIENT_QUERY}
    