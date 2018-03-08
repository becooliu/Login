<template>
	<div class="login_wrapper">
        <div class="panel_header">
            <h2>用户登录</h2>
            <!-- <p>10036信手通平台，欢迎您</p> -->
        </div>
        <div class="panel_body">
            <form action="">
                <div class="field clearfix">
                    <label for="" class="required">用户名：</label><input type="text" placeholder="请输入正确的手机号/帐号" name="username" v-model="username">
                </div>
                <div class="field clearfix">
                    <label for="" class="required">密码：</label><input type="password" placeholder="请输入正确的密码" name="password" v-model="password">
                </div>
                <div class="field clearfix">
                    <a class="apply" href="register.html">没有帐号？<span class="orange">免费申请</span></a>
                </div>
                <div class="field field_btn clearfix" style="text-align: center;">
                    <a href="javascript:void(0);" class="btn btn_login2" @click="userLogin">登录</a>
                    <br>
                    <a href="javascript:void(0);" style="text-align: right;" class="forget">忘记密码</a>
                </div>
                
            </form>
        </div>
    </div>
</template>
<script>
	
	export default {
		name : 'Loginin',
		data(){
			return {
				username : '',
				password: ''
			}
		},
		methods: {
			userLogin(){
				this.$http.get('../../static/data/userData.json').then((res)=>{
					var data = res.body;
					if(data.code == 1) {
						if(data.username == this.username && data.password == this.password) {
							this.$router.push({name: 'UserInfo'})
						}else {
							alert('帐号或密码错误，请确认')
						}
					}
				},(error) => {
					console.log(error)
				})
				
			}
		}
	}
</script>
