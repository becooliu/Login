<template>
  <div class="login_wrapper">
        <div class="panel_header">
            <h2>用户注册</h2>
        </div>
        <div class="panel_body">
            <form action="" enctype="multipart/form-data">
                
                <div class="field clearfix">
                    <label for="" class="required">用户名：</label><input type="text" v-model="username" placeholder="请输入您的手机号/邮箱" name="username" ref="username">
                </div>
                <div class="field clearfix">
                    <label for="" class="required">密码：</label><input type="password" v-model="password" placeholder="请输入密码" name="password" ref="password">
                </div>
                <div class="field clearfix">
                    <label for="" class="required">确认密码：</label><input type="password" v-model="password2" placeholder="请再次输入密码" name="password2" ref="password2">
                </div>
                
                <div class="field field_btn clearfix" style="text-align: center;">
                    <a href="javascript:void(0);" class="btn btn_login2" @click="userRegist">注册</a>
                </div>
                <div class="field clearfix" style="margin-top: 0px; color: #666;">
                    <input type="checkbox" name="agree">我已经阅读《XX平台用户协议》 已有账号 ? 
                    <router-link to="/login" tag="a" style="color: #0274f1;">登录</router-link>
                    <!-- <a href="login.html" style="color: #0274f1;">登录</a> -->
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Register",
        data(){
            return {
                username: '',
                password: '',
                password2: '',
                avatar: null,
                isAdmin: false
            }
        },
        methods: {

            userRegist(){
                //进行简单的注册前的检验
                //检查用户名/密码/确认密码是否为空
                if(!this.checkValue(this.username) || !this.checkValue(this.password) || !this.checkValue(this.password2)) {
                    console.log(this.username,this.password,this.password2);
                    window.alert('用户名/密码/确认密码不能为空，请检查。')
                    return false;
                }
                //检查两次密码是否一致
                if(this.password != this.password2) {
                    window.alert('两次密码不一致，请确认。');
                    return false;
                }
                //检查用户格式是否为邮箱或手机号
                if(!this.IsMobile(this.username) && !this.IsEmail(this.username)) {
                    window.alert('用户名必须是邮箱或手机号，请确认。')
                    return false;
                }
                let userData = {
                    username: this.username,
                    password: this.password,
                    avatar: this.avatar,
                    isAdmin: false
                }
                this.$http.post('/api/login/createAccount', userData, {headers:{'Content-Type':'multipart/form-data'},emulateJSON: true})
                .then(
                    (res) => {
                        switch (res.body.code) {
                            case "error":
                                window.alert(res.body.message);
                                break;
                            case "1":
                                window.alert(res.body.message);
                                this.$refs.username.focus();
                                break;
                            case "2":
                                window.alert(res.body.message);
                                this.$router.push({name: "UserInfo"});
                                break;
                            default: 
                                window.alert('注册失败，请联系系统管理员。')
                        }
                    }
                )
            },
            checkValue(val){
                if(val.trim() == "") {
                    return false
                }else {
                    return true
                }
            },
            getImgUrl(e){
                e = e || window.event;
                var files = e.target.files || e.dataTransfer.files;
                if(!files.length) return;
                this.avatar =files[0];
                //console.log(this.$refs.avatar.files[0]);
            }
        }
    }
</script>
