<template>
    <div class="reset-wrapper">
        <el-form :model="rulesForm" ref="resetform" lable-position="right" status-icon :rules="rules" label-width="80px">
            <el-form-item label="新密码" required prop="password1">
                <el-input name="password1" type="password" v-model="rulesForm.password1"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" required prop="password2">
                <el-input name="password2" type="password" v-model="rulesForm.password2"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="submitForm('resetform')">确认修改</el-button>
                <el-button size="small" @click="resetForm('resetform')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'Reset',
        data(){
            //password1 简单验证
            var validatepass1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码。'))
                }else{
                    if(this.rulesForm.password2 !== '') {
                        this.$refs.resetform.validateField('password2')
                    }
                    callback();
                }
            };
            //password1 简单验证
            var validatepass2 = (rule, value, callback) => {
                if(value === '') {
                    callback(new Error('确认密码不能为空'))
                }else if(value !== this.rulesForm.password1) {
                    callback(new Error('两次密码不一致，请确认。'))
                }else {
                    callback();
                }
            };
            return {
                rulesForm: {
                    password1: '',
                    password2: ''
                },
                rules: {
                    password1: [{
                        validator: validatepass1,trigger:'blur'
                    }],
                    password2: [{
                        validator: validatepass2,trigger:'blur'
                    }]
                }
            }
        },
        methods: {
            submitForm(formname){
                //验证表单的合法性
                this.$refs[formname].validate((valid)=>{
                    //合法则提交到服务器
                    if(valid) {
                        let userData = {
                            username: this.$store.getters.getStorage,
                            password: this.rulesForm.password1
                        }
                        this.$http.post('/api/resetpass',userData).then((res) => {
                            let resData = res.body;
                            if(resData.code == "200") {
                                this.$message.success(resData.message);
                            }
                        })
                    //不合法则提示修改密码失败
                    }else {
                        this.$message.error('密码修改失败，请联系系统管理员。');
                        return false;
                    }
                })
            },
            resetForm(formname){
                this.$refs[formname].resetFields();
            }
        }
    }
</script>
<style>
    .reset-wrapper {
        width: 480px;
        margin: 20px auto;
    }
</style>
