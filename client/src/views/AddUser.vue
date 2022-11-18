<template>
    <div>
        <div v-if="loading || loadingI">Loading...</div>
        <div v v-if="error || errorI">{{error + errorI}}</div>

        <div v-else>

            <input v-model="name" placeholder="User name" />
            
            <select  v-model="t_ingredient" >
          <option disabled value="">Please select one</option>
          <option v-for="ingredient in ingredients" :key="ingredient.id" :value="ingredient">{{ingredient.name}}</option>
         
        </select>

        <select  v-model="t_recipe">
          <option disabled value="">Please select one</option>
          <option v-for="recipe in recipes" :key="recipe.id" :value="recipe">{{recipe.name}}</option>
         
        </select>

        <h2>Allergys</h2>
        <input type="checkbox" id="nuts" value="an" v-model="allergytype">
        <label for="nuts">Nuts</label>

        <input type="checkbox" id="lactose" value="al" v-model="allergytype">
        <label for="lactose">Lactose</label>

        <input type="checkbox" id="glutenKla" value="ag" v-model="allergytype">
        <label for="gluten">Gluten</label>

        <button @click="onSubmit">Submit</button>
        </div>

        

    </div>
</template>

<script setup>
import {ref, computed, watch} from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable';
//import { ADD_USER } from '@/mutations/userMutations';
import { ALL_INGREDIENT_QUERY } from '@/queries/ingredientQueries';
import { ALL_RECIPES_QUERY } from '@/queries/recipeQueries';
import { ADD_USER } from '@/mutations/userMutations';

const name = ref('')
const allergytype = ref([])
const myPantry = ref([])
const favRecipes = ref([])




const {result: resultIng,error: errorI,loading: loadingI} = useQuery(ALL_INGREDIENT_QUERY)
const ingredients = computed(() => resultIng.value?.ingredients ?? [])
const {result: resultR, loading, error} = useQuery(ALL_RECIPES_QUERY)
const recipes = computed(() => resultR.value?.all_recipes ?? [])


const t_ingredient = ref({})
const t_recipe = ref({})

const {mutate: addUser} = useMutation(ADD_USER)

watch(t_recipe, (t_recipe) =>{
        favRecipes.value.find( e => e.id == t_recipe.id) == undefined ? favRecipes.value.push(t_recipe) : null
}) 
watch(t_ingredient, (t_ingredient) =>{
    myPantry.value.find( e => e.type.id == t_ingredient.id) == undefined ? myPantry.value.push({type: t_ingredient, amount: 0}) : null
})  


const myPantryhelper = (() =>{
        let inputIngre = []
        myPantry.value.forEach(e => {
            inputIngre.push({ingredientid: e.type.id, amount: e.amount})
        })
        return inputIngre
    })

const onSubmit = () =>{
    addUser({name: name.value, allergyType: allergytype.value.length > 0 ? allergytype.value : 'nn', favRecipes: favRecipes.value.map(e => e.id), myPantry: myPantryhelper()})
}


</script>