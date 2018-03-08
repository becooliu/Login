import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import UserInfo from '../components/UserInfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user_info',
      name: 'UserInfo',
      component: UserInfo
    }
  ]
})
