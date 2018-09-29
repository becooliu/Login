import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import UserInfo from '../components/UserInfo.vue'
import Register from '../components/Register.vue'
import PostImg from '../components/PostImg.vue'
import Reset from '../components/Reset.vue'

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
      path: '/userInfo',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/postimg',
      name: 'PostImg',
      component: PostImg
    },
    {
      path: '/reset',
      name: 'Reset',
      component: Reset
    }
  ]
})
