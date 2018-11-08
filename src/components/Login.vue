<template>
	<div class="login_wrapper">
        <div class="panel_header">
            <h2>用户登录</h2>
            <!-- <p>10036信手通平台，欢迎您</p> -->
        </div>
        <div class="panel_body">
          <el-form ref="form" label-position="right" label-width="80px">
            <el-form-item label="用户名：">
              <el-input v-model="username" name="username" ref="username" placeholder="请输入正确的手机号/帐号"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input v-model="password" name="password" ref="password" placeholder="请输入正确的密码" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <router-link tag="a" to="/register" v-bind:class="style.apply">没有帐号？<span :class="style.orange">快速注册</span></router-link>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="userLogin">登录</el-button>
              <router-link tag="a" to="/reset" style="margin-left: 15px; color: #999;">忘记密码</router-link>
              <!-- <el-button>忘记密码</el-button> -->
            </el-form-item>
          </el-form>
            <!-- <form id="loginForm" action="">
                <div class="field clearfix">
                    <label for="" class="required">用户名：</label><input type="text" placeholder="请输入正确的手机号/帐号" name="username" v-model="username" ref="username">
                </div>
                <div class="field clearfix">
                    <label for="" class="required">密码：</label><input type="password" placeholder="请输入正确的密码" name="password" v-model="password">
                </div>
                <div class="field clearfix">
                  <router-link tag="a" to="/register" v-bind:class="style.apply">没有帐号？<span :class="style.orange">快速注册</span></router-link>
                    
                </div>
                <div class="field field_btn clearfix" style="text-align: center;">
                    <a href="javascript:void(0);" class="btn btn_login2" @click="userLogin">登录</a>
                    <br>
                    <a href="javascript:void(0);" style="text-align: right;" class="forget">忘记密码</a>
                </div>
                
            </form> -->
        </div>
    </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      isAdmin: false,
      style: {
        apply: "apply",
        orange: "orange"
      }
    };
  },
  methods: {
    userLogin: function() {
      //简单检验用户名和密码是否为空
      if (this.username == "" || this.password == "") {
        window.alert("用户名或密码不能为空。");
        return;
      }

      var userData = {
        username: this.username,
        password: this.password,
        isAdmin: false
      };
      this.$http
        .post("/api/login/getAccount", userData, { emulateJSON: true })
        .then(
          res => {
            switch (res.body.code) {
              case "0":
                window.alert("登录失败，请联系系统管理员。");
                break;
              case "1":
                window.alert("该帐号已注册");
                this.$refs.username.focus();
                break;
              case "2":
                this.setCookie("userSession", this.username, 1);
                console.log(res.body.token);
                //登录成功，修改state及写入localStorage
                this.$store.commit('$_setStorage',this.username); 
                this.$store.commit('$_setTokenStorage', res.body.token);
                //localStorage.username = this.username;
                this.$router.push({ name: "UserInfo" });
                break;
              case "3":
                window.alert("帐号或密码错误，请确认。");
                //登录失败删除localStorage并修改state
                this.$store.commit('$_removeStorage')
                break;
              case "4":
                window.alert("帐号不存在，请确认。");
                break;
              default:
                window.alert("登录失败");
            }
          },
          error => {
            console.log(error);
          }
        );
    }
  }
};
</script>
