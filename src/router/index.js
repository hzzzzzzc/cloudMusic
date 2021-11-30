import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/search',
    component: () => import ('../components/search/searchDetail')
  }, 
  {
    path: '/home',
    component: Home
  },
  {
    path: '/list',
    component: () => import ('../components/songList/SongList')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
