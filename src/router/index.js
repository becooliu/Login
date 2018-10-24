import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import UserInfo from '../components/UserInfo.vue'
import Register from '../components/Register.vue'
import PostImg from '../components/PostImg.vue'
import Reset from '../components/Reset.vue'
import AddUser from '../components/sysadmin/AddUser.vue'
import FindUser from '../components/sysadmin/FindUser.vue'

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
    },
    {
      path: '/sysadmin/adduser',
      name: 'AddUser',
      component: AddUser
    },
    {
      path: '/sysadmin/finduser',
      name: 'FindUser',
      component: FindUser
    }
  ]
})
