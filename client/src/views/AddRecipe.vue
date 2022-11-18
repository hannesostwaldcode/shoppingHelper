<template>
    <div>
        <div v-if="error"></div>
        <div v-if="loading"></div>
       <div v-else>
        <p>add Recipe</p>
        <input v-model="name" placeholder="name" />
        <input v-model="steps" placeholder="steps" />
        <input v-model.number="kcal" placeholder="kcal" />
        <input v-model.number="diff" placeholder="Difficulty" />
        <input v-model.number="time" placeholder="Time in Minutes" />
        <p>Selected:</p>
        <div v-for="sIng in selectedIngredients" :key="sIng.type.id" >
            <p >{{sIng.type.name}}</p>
            <input v-model.number="sIng.amount" placeholder="amount" />
            <p>{{sIng.type.unit}}</p>
        </div>
        
        <select  v-model="selectedIngredient" @change="addIngredienttoList">
          <option disabled value="">Please select one</option>
          <option v-for="ingredient in ingredients" :key="ingredient.id" :value="ingredient">{{ingredient.name}}</option>
         
        </select>
        <button @click="onSubmit">Submit</button>
    </div>
    </div>

    
    
</template>

<script setup>
  import { useQuery, useMutation } from '@vue/apollo-composable'
import { computed, ref } from '@vue/runtime-core'
import{ ALL_INGREDIENT_QUERY} from '../queries/ingredientQueries'
 import {ADD_RECIPE} from '../mutations/recipeMutations'

 const {result, error, loading} = useQuery(ALL_INGREDIENT_QUERY)
 const ingredients = computed(() => result.value?.ingredients ?? [])


 const selectedIngredients = ref([])
 const selectedIngredient = ref({})

 const time = ref()
 const diff = ref()
 const kcal = ref()
 const steps = ref('')
 const name = ref('')
 const {mutate: addRecipe} = useMutation(ADD_RECIPE)

 const onSubmit = () => {
      
      if(name === '' || time===null || steps === '' || kcal===null || diff === null) {
        return alert('Please fill in all fields')
      }
      addRecipe({ name: name.value ,steps: steps.value, kcal: kcal.value,diff: diff.value,time: time.value, ingredients: ingredientHelper()})
  
      name.value = ''
      steps.value = ''
      kcal.value = null
      diff.value = null
      time.value = null
    }

    const ingredientHelper = (() =>{
        let inputIngre = []
        selectedIngredients.value.forEach(e => {
            inputIngre.push({ingredientid: e.type.id, amount: e.amount})
        })
        return inputIngre
    })

 const addIngredienttoList = (() => {
   
    if (selectedIngredients.value.find(e => e.type.id == selectedIngredient.value?.id) == undefined){
        selectedIngredients.value.push({type: selectedIngredient.value, amount: 0})
    }
})

</script>