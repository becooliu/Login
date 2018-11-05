// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/el-icon-ali.css'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
//import  './assets/bootstrap-3.3.7-dist/css/bootstrap.min.css'
import Login from '../src/components/Login.vue'
import UserInfo from '../src/components/UserInfo.vue'
import Register from '../src/components/Register.vue'
import PostImg from '../src/components/PostImg.vue'

import store from './store.js'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(Vuex)

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  store,
  template: '<App/>',
  methods: {
    checkLogin() {
      console.log('methods check');
      if (this.getCookie('session') == null || this.getCookie('session') == '') {
        this.$router.push({
          name: "Login"
        });
      } else {
        this.$router.push('/user_info');
      }
    }
  },

  /* watch: {
    "$route": "checkLogin"
  } */
})

/*router.beforeEach((to, from, next) => {
  //是否登录
  let isLogin = function(){
    return vm.$db.get('tooken')
  }
  if(to.path === "/login" && !isLogin()) {
    //没有登录是/login
    return next()
  }else if(!isLogin()){
    //没有登录不是/login
    return next({path: '/login'})
  }else {
    //登录不是/login
    let rule = vm.$db.get('rule')
    let asignRule = Common.asignRouter(rule);
    for(let i in asignRule) {
      if(asignRule[i] instanceof Object) {
        if(asignRule[i].path === to.path) {
          return next()
        }
      }
    }
  }
  return next({path: '/error'})
})
let tooken = vm.$db.get('tooken')
if(tooken) {
  let rule = vm.$db.get('rule');
  // 获取路由
  Common.addRouters(router,rule);
}*/

//设置cookie,增加到vue实例方便全局调用
//vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
//如果session保存到vuex的话除外
Vue.prototype.setCookie = function (cookieName, cookieValue, expireDays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expireDays);
  document.cookie = cookieName + "=" + escape(cookieValue) +
    ((expireDays == null) ? 1 : ";path=/; expires=" + exdate.toGMTString())
};

//获取cookie、
Vue.prototype.getCookie = function (name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) {
    return unescape(arr[2]);
  }
  return null;

}

//删除cookie
Vue.prototype.delCookie = function (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = this.getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";path=/;expires=" + exp.toGMTString();
}

Vue.prototype.checkLogin = function () {
  console.log('check');
  if (this.getCookie('session') == null || this.getCookie('session') == '') {
    this.$router.push({
      name: "Login"
    });
  } else {
    this.$router.push('/user_info');
  }
}

//扩展校验是否是手机号和邮箱的方法
Vue.prototype.IsMobile = function (m) {
  var p = /^1[3456789][0-9]{9}$/gi;
  return p.test(m);
}
Vue.prototype.IsEmail = function(email){
var p = /\s*\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*\s*/;
return p.test(email);
}
