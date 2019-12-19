<template>
  <div id="app">
    <el-row>
      <div class="log-out" v-if="getLoginStatus">
        <!-- 顶部菜单 -->
        <Menu></Menu>
        <!-- <el-button @click="logout">退出登录</el-button> -->
      </div>
    </el-row>
    <el-row>
      <transition name="fade">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </transition>
    </el-row>

  </div>
  <!-- <div class="container" id="app">
    <div class="log-out" v-if="getLoginStatus">
      <a href="javascript:void(0);" class="btn btn-default" @click="logout">退出登录</a>
    </div>
    <transition name="fade">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </div> -->
</template>

<script>
import Menu from "./components/public/Menu";

export default {
  name: "App",
  components: {
    Menu
  },
  data(){
    return {
      isLogin: false
    }
  },
  computed: {
    getLoginStatus(){
      return this.$store.getters.getStorage;
    }
  },
  methods: {
    getCookie(name){
      var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"))
      if(arr != null) {
        return unescape(arr[2])
      }
      return null;
    },
    delCookie(name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = this.getCookie(name);
      if (cval != null)
        document.cookie = name + "=" + cval + ";path=/;expires=" + exp.toGMTString();
    },
    logout(){
      this.delCookie('userSession');
      this.$router.push({'name':'Login'});
      this.$store.commit('$_removeStorage');
      this.isLogin = false;
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
  color: #666;
}

.fl_l {
  float: left;
}

.fl_r {
  float: right;
}

.clearfix {
  zoom: 1;
}

.clearfix:after {
  display: block;
  content: "";
  visibility: hidden;
  height: 0;
  clear: both;
}

.text-center {
  text-align: center;
}

.btn {
  display: inline-block;
}
.login_wrapper {
  width: 480px;
  margin: 0 auto;
  background-color: #fff;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  margin: 0px auto;
  padding: 20px 0px;
}

.login_wrapper .panel_header h2 {
  font-size: 48px;
  color: #0274f1;
  text-align: center;
  font-weight: normal;
}

.login_wrapper .panel_header > p {
  text-align: center;
  margin-top: 0;
  color: #666;
}

.login_wrapper .panel_body form .field {
  width: 396px;
  min-height: 36px;
  line-height: 36px;
  margin: 30px auto;
  font-size: 14px;
}

.login_wrapper .panel_body form .field.field_btn {
  margin-bottom: 10px;
}

.login_wrapper .panel_body form .field > label {
  color: #333;
  display: inline-block;
  width: 100px;
  margin-right: 8px;
  text-align: right;
}

.login_wrapper .panel_body form .field > label.required:before {
  color: #f00;
  content: "*";
}

.login_wrapper .panel_body form .field input[type="text"],
.login_wrapper .panel_body form .field input[type="password"] {
  height: 36px;
  line-height: 36px;
  width: 280px;
  border: 1px solid #e1e6f1;
  padding: 0 3px;
}

.login_wrapper .panel_body form .field input[type="text"].input_captcha,
.login_wrapper .panel_body form .field input[type="password"].input_captcha {
  width: 150px;
}

.login_wrapper .panel_body form .field .btn_captcha {
  height: 36px;
  line-height: 36px;
  width: 100px;
  color: #fff;
  text-align: center;
  background-color: #0274f1;
  vertical-align: middle;
  margin-left: 24px;
}

.login_wrapper .panel_body form .field .apply {
  margin-left: 108px;
}

.login_wrapper .panel_body form .field .btn_login2 {
  width: 300px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  -webkit-box-shadow: 3px 3px 10px #dddddd, -3px -3px 10px #dddddd;
  -moz-box-shadow: 3px 3px 10px #dddddd, -3px -3px 10px #dddddd;
  box-shadow: 3px 3px 10px #dddddd, -3px -3px 10px #dddddd;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  background-color: #0274f1;
  margin: 30px auto 15px;
}

.login_wrapper .panel_body form .field .forget {
  color: #666;
  float: right;
  margin-right: 48px;
}

/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

.box {
  margin-top: 20px;
}
</style>
