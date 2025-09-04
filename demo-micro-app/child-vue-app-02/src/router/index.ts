import { createRouter, createWebHistory } from 'vue-router'


import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProductsView from '../views/ProductsView.vue'
// @ts-ignore
import Luckysheet from '../views/Luckysheet.vue'
import ContactView from '../views/ContactView.vue'

// @ts-ignore
import Univer from '../views/UniverDemo/index.vue'
import Table from '../views/Table/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/luckysheet',
      name: 'luckysheet',
      component: Luckysheet
    },
    {
      path: '/univer',
      name: 'univer',
      component: Univer
    },
    {
      path: '/table',
      name: 'table',
      component: Table
    }
  ]
})

export default router
