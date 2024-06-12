import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../views/MenuView.vue')
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: () => import('../views/RecipesView.vue')
  },
  {
    path: '/recipes/:nombre',
    name: 'food',
    component: () => import('../views/RecipesMenuSelector.vue')
  },
  {
    path: '/recipes/:nombre/:id',
    name: 'recipe',
    component: () => import('../views/RecipeView.vue')
  },
  {
    path: '/identificarse',
    name: 'indentify',
    component: () => import('../views/LogReg.vue')
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../views/ErrorView.vue')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../views/NewRecipe.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue')
    
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../views/ErrorView.vue')
    
  },
  {
    path: '/reset/:token',
    name: 'ResetPassword',
    component: () => import('../views/ResetView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error',
    component: () => import('../views/ErrorView.vue')
    
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
