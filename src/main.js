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

Vue.onBeforeUnload = function (event){
  var clientBrowser = this.chargeBrowser();
  var isIE = document.all?true:false;//另一方法
  var evt = event ? event : (window.event ? window.event : null);
  if(clientBrowser=="IE"){
      var n = evt.screenX - window.screenLeft;
      var b = n > document.documentElement.scrollWidth - 20;
      if(b && evt.clientY < 0 || evt.altKey){
          console.log("IE关闭非刷新");
          return confirm("您确定要离开系统么？IE关闭非刷新");
      }else{
          console.log("IE刷新非关闭");
          return confirm("您确定要离开系统么？IE刷新非关闭");
      }
  }else if (clientBrowser==="Chrome") {
      clearCookie();
  }else{
      if(document.documentElement.scrollWidth != 0){
          console.log("FF刷新非关闭");
          return confirm("您确定要离开系统么？FF刷新非关闭");
      }else{
          console.log("FF关闭非刷新");
          return confirm("您确定要离开系统么？FF关闭非刷新");
      }
  }
}
Vue.chargeBrowser = function () {
  var userAgent = navigator.userAgent;
  var isOpera = userAgent.indexOf("Opera") > -1;
  if (isOpera) {
      return "Opera"
  }else if(userAgent.indexOf("Firefox") > -1) {
      return "Firefox";
  }else if(userAgent.indexOf("Chrome") > -1){
      return "Chrome";
  }else if(userAgent.indexOf("Safari") > -1) {
      return "Safari";
  }else if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
      return "IE";
  }else if(userAgent.indexOf("Trident") > -1) {
      return "Edge";
  }else if(userAgent.indexOf("QQ") > -1) {
      return "QQ";
  }else{
      return "";
  }
}
