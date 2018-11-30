import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui';
import Login from '../components/Login.vue'
import UserInfo from '../components/UserInfo.vue'
import Register from '../components/Register.vue'
import PostImg from '../components/PostImg.vue'
import Reset from '../components/Reset.vue'
import AddUser from '../components/sysadmin/AddUser.vue'
import FindUser from '../components/sysadmin/FindUser.vue'

Vue.use(Router)
//Vue.use(ElementUI)

const vueRouter = new Router({
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
      component: UserInfo,
      meta: {
        requireAuth: true
      }
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
      component: Reset,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/sysadmin/adduser',
      name: 'AddUser',
      component: AddUser
    },
    {
      path: '/sysadmin/finduser',
      name: 'FindUser',
      component: FindUser,
      meta: {
        requireAuth: true
      }
    }
  ]
})

//前端路由检查访问的页面是否需要用户登录。
vueRouter.beforeEach((to, from , next) => {
  if(to.matched.some(record => record.meta.requireAuth)) {
    if(!localStorage.getItem('user')) {
      Message.warning('请先登录');
      vueRouter.push({
        name: 'Login'
      })
    }else {
      next();
    }
  }else {
    next()
  }
})

export default vueRouter
/* export default {
  name: router,
  routers: vueRouter
} */
