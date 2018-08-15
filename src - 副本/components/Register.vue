<template>
  <div class="login_wrapper">
        <div class="panel_header">
            <h2>申请试用</h2>
            <p>只需申请一次，请认真填写所有项目</p>
        </div>
        <div class="panel_body">
            <form action="">
                <div class="field clearfix">
                    <label for="" class="required">公司名称：</label><input type="text" placeholder="请输入正确的手机号/帐号" name="company-name">
                </div>
                <div class="field clearfix">
                    <label for="" class="required">职务：</label><input type="text" placeholder="请输入您真实的公司职务" name="duties">
                </div>
                <div class="field clearfix">
                    <label for="" class="required">姓名：</label><input type="text" placeholder="请输入您的姓名" name="name">
                </div>
                <div class="field clearfix">
                    <label for="" class="required">电话：</label><input type="text" placeholder="请输入您的手机号" name="phone">
                </div>
                <div class="field clearfix">
                    <label for="" class="required">验证码：</label><input type="text" class="input_captcha" placeholder="请输入验证码" name="captcha">
                    <a href="javascript:void(0);" class="btn btn_captcha">获取验证码</a>
                </div>
                
                <div class="field field_btn clearfix" style="text-align: center;">
                    <a href="javascript:void(0);" class="btn btn_login2">提交</a>
                </div>
                <div class="field clearfix" style="margin-top: 0px; color: #666;">
                    <input type="checkbox" name="agree">我已经阅读信手通《云通讯平台用户协议》 已有账号 ? 
                    <a href="login.html" style="color: #0274f1;">登录</a>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Register"
    }
</script>
