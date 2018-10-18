<template>
  <div id="app">
	<el-container>
		<el-header v-if="getLoginStatus">
			<el-row>
				<!--顶部导航-->
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
					<el-menu-item index="1">处理中心</el-menu-item>
					<el-submenu index="2">
						<template slot="title">我的工作台</template>
						<el-menu-item index="2-1">选项1</el-menu-item>
						<el-menu-item index="2-2">选项2</el-menu-item>
						<el-menu-item index="2-3">选项3</el-menu-item>
						<el-submenu index="2-4">
						<template slot="title">选项4</template>
						<el-menu-item index="2-4-1">选项1</el-menu-item>
						<el-menu-item index="2-4-2">选项2</el-menu-item>
						<el-menu-item index="2-4-3">选项3</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-menu-item index="3" disabled>消息中心</el-menu-item>
					<el-menu-item index="4">
						<a href="javascript:void(0);" target="_blank">订单管理</a>
					</el-menu-item>
					<el-menu-item index="5">
						<el-button size="small" @click="logout">退出登录</el-button>
					</el-menu-item>
				</el-menu>
				<!--顶部导航 end-->
			</el-row>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<!-- 侧导航 -->
				<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>用户管理</span>
						</template>
						<el-menu-item-group>
							
							<el-menu-item index="1-1">
								<router-link :to='{name: "AddUser"}'>新增用户</router-link></el-menu-item>
							<el-menu-item index="1-2">
								<router-link :to='{name: "Reset"}'>密码修改</router-link></el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="分组2">
							<el-menu-item index="1-3">选项3</el-menu-item>
						</el-menu-item-group>
						<el-submenu index="1-4">
							<template slot="title">选项4</template>
							<el-menu-item index="1-4-1">选项1</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-menu-item index="2">
						<i class="el-icon-menu"></i>
						<span slot="title">导航二</span>
					</el-menu-item>
					<el-menu-item index="3" disabled>
						<i class="el-icon-document"></i>
						<span slot="title">导航三</span>
					</el-menu-item>
					<el-menu-item index="4">
						<i class="el-icon-setting"></i>
						<span slot="title">导航四</span>
					</el-menu-item>
				</el-menu>
				<!-- 侧导航end -->
			</el-aside>
			<el-container>
				<el-main>
					<el-row>
						<transition name="fade">
							<keep-alive>
								<router-view/>
							</keep-alive>
						</transition>
					</el-row>
				</el-main>
				<el-footer class="text-center">&copy;Becoo All Rights Reserved.</el-footer>
			</el-container>
		</el-container>
	</el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
	  isLogin: false,
	  activeIndex: '1'
    };
  },
  computed: {
    getLoginStatus() {
      return this.$store.getters.getStorage;
    }
  },
  methods: {
    checkIsLogin() {
      /* if(this.$store.getters.getStorage) (
        console.log('')
      ) */
      /* if(this.getCookie('userSession')){
        this.isLogin = true
      } */
    },
    getCookie(name) {
      var arr = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]*)(;|$)")
      );
      if (arr != null) {
        return unescape(arr[2]);
      }
      return null;
    },
    delCookie(name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = this.getCookie(name);
      if (cval != null)
        document.cookie =
          name + "=" + cval + ";path=/;expires=" + exp.toGMTString();
    },
    logout() {
      this.delCookie("userSession");
      this.$router.push({ name: "Login" });
      this.$store.commit("$_removeStorage");
      this.isLogin = false;
	},
	handleSelect(key,keyPath) {
		console.log(key , keyPath)
	},
	handleOpen(key, keyPath) {
		console.log(key , keyPath)
	},
	handleClose(key, keyPath) {
		console.log(key , keyPath)
	}
  } /* ,
  mounted() {
    this.checkIsLogin();
  }, */
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
.wrappre {
  width: 1200px;
  margin: 0 auto;
}
.form-wrapper {
  width: 480px;
  margin: 0 auto;
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

/*element-ui*/
.el-aside {
	margin-top: 30px;
}
.el-aside .el-menu-item a {
	color: #fff;
}
/*element-ui end*/
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
