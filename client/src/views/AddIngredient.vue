<template>
    <div class="aingredient">
      <p v-if="error">{{error}}</p>
      <p v-if="loading">Loading...</p>
      <ul v-else>
        <li v-for="recipe in recipes" :key="recipe.id">{{recipe.name}}</li>
      </ul>
      <div>
        <input v-model="name" placeholder="edit me" />
        <textarea v-model="description" placeholder="edit me" ></textarea>
  
        <select v-model="unit">
          <option disabled value="">Please select one</option>
          <option>g</option>
          <option>ml</option>
          <option>aq</option>
          <option>tbsp</option>
          <option>tsp</option>
        </select>
        <select v-model="allergytype">
          <option disabled value="">Please select one</option>
          <option>nn</option>
          <option>ag</option>
          <option>al</option>
          <option>an</option>
        </select>
        <input v-model.number="salesunit" placeholder="edit me" />
        <button @click="onSubmit"  className="btn btn-primary">Submit</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useMutation, useQuery } from '@vue/apollo-composable';
  import { computed, ref } from '@vue/runtime-core';
  import{ ALL_RECIPES_QUERY} from '../queries/recipeQueries'
  import {ADD_INGREDIENT} from '../mutations/ingredientMutations'
  
    const {result, loading, error} = useQuery(ALL_RECIPES_QUERY)
    const recipes = computed(() => result.value?.all_recipes ?? [])
  
    const name = ref("")
    const description = ref("")
    const unit = ref('g')
    const salesunit = ref(1)
    const allergytype = ref('nn')
  
    const {mutate: addIngredient} = useMutation(ADD_INGREDIENT)
  
    const onSubmit = () => {
      
      if(name === '' || description==='' || salesunit === null) {
        return alert('Please fill in all fields')
      }
      addIngredient({ name: name.value,description: description.value,salesunit: salesunit.value,unit: unit.value,allergytype: allergytype.value})
  
      name.value = ''
      description.value = ''
      salesunit.value = null
    }
  
  </script>
  