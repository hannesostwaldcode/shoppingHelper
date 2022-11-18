import { createRouter, createWebHashHistory } from 'vue-router'
import AddIngredient from '../views/AddIngredient.vue'
import AddRecipe from '../views/AddRecipe.vue'
import AddUser from '../views/AddUser.vue'

const routes = [
 
  {
    path: '/sd',
    name: 'arecipe',
    component: AddRecipe
  },
  {
    path: '/',
    name: 'aingredient',
    component: AddIngredient
  },
  {
    path: '/addU',
    name: 'adduser',
    component: AddUser
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
