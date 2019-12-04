// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
//import  './assets/bootstrap-3.3.7-dist/css/bootstrap.min.css'
import Login from '../src/components/Login.vue'
import UserInfo from '../src/components/UserInfo.vue'
import Register from '../src/components/Register.vue'
import PostImg from '../src/components/PostImg.vue'
import Menu from '../src/components/public/Menu.vue'

import store from './store.js'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
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
Vue.prototype.getUserInfo = function() { //获取用户名
  return this.getCookie("userSession");
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
