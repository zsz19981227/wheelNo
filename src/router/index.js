import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Details from '@/components/details'
import Img from '@/components/img'
import RouteDetail from '@/components/RouteDetail'
import ImgDetail from '@/components/imgDetails'
// import City from '@/components/city'
import Login from '@/components/login'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/details',
      name: 'Details',
      component: Details
    },{
      path: '/img',
      name: 'Img',
      component: Img
    },{
      path: '/route',
      name: 'RouteDetail',
      component: RouteDetail
    },{
      path: '/imgDetail',
      name: 'ImgDetail',
      component: ImgDetail
    },{
      path : '/login',
      name: 'Login',
      component : Login
    },{
      path : '*',
      redirect : '/index'
    }
  ]
})
router.beforeEach((to,from,next)=>{
  let login = window.localStorage.getItem('login')
  if(!login&&to.path !='/login'){
    console.log(111)
    next('/login')
  }
  next()
})

export default router