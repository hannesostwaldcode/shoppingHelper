import {gql} from 'graphql-tag'

const ALL_RECIPES_QUERY = gql`
    query {
      all_recipes
      {
          id
          name
          steps
          ingredients{ 
            type{ 
              name
              }, 
            amount
            }
        }
      }
    
  `;

  export {ALL_RECIPES_QUERY}