import Vue from 'vue'
import Router from 'vue-router'
import Address from "../pages/Address/Address"
import City from "../pages/Address/City"
// import Msite from '../pages/Msite/Msite'
// import Search from '../pages/Search/Search'
// import Order from '../pages/Order/Order'
// import Profile from '../pages/Profile/Profile'
const Msite =() => import('../pages/Msite/Msite.vue')
const Search =() => import('../pages/Search/Search.vue')
const Order =() => import('../pages/Order/Order.vue')
const Profile =() => import('../pages/Profile/Profile.vue')

import Login from '../pages/Login/Login'
import Shop from "../pages/Shop/Shop"
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods"
import ShopRatings from "../pages/Shop/ShopRatings/ShopRatings"
import ShopInfo from "../pages/Shop/ShopInfo/ShopInfo"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      // redirect: '/province',
      redirect: '/msite',
    },
    {
      path: '/msite',
      component: Msite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/province',
      component: Address,
    },
    {
      path: '/city',
      component: City,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods,
        },
        {
          path: '/shop/ratings',
          component: ShopRatings,
        },
        {
          path: '/shop/info',
          component: ShopInfo,
        },
        {
          path: '',
          redirect:'/shop/goods'
        },
      ]
    },
  ]
})
