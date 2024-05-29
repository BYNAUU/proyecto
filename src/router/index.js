import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/menu',
    name: 'menu',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MenuView.vue')
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
