import { createRouter, createWebHistory } from 'vue-router'


import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProductsView from '../views/ProductsView.vue'
// @ts-ignore
import Luckysheet from '../views/Luckysheet.vue'
import ContactView from '../views/ContactView.vue'
import Exceljs from '../views/Exceljs.vue'

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
      path: '/exceljs',
      name: 'exceljs',
      component: Exceljs
    }
  ]
})

export default router
