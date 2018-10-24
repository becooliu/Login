<template>
    <div class="form-wrapper">
        <h2 style="text-align: center;">新增用户</h2>
        <el-form :model="rulesForm" ref='adduserForm' status-icon :rules='rules' label-position="right" label-width="80px">
            <el-form-item label="用户名" required prop="username">
                <el-input name="username" v-model="rulesForm.username" ref="username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" required prop="password1">
                <el-input name="password1" v-model="rulesForm.password1" ref="password1" type="password" placeholder="请设置密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" required prop="password2">
                <el-input name="password2" v-model="rulesForm.password2" ref="password2" type="password" placeholder="请再次设置密码"></el-input>
            </el-form-item>
            <el-form-item label="管理员">
                <el-radio v-model="isAdmin" :label="true">是</el-radio>
                <el-radio v-model="isAdmin" :label="false">否</el-radio>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="submitForm('adduserForm')">添加用户</el-button>
                <el-button size="small" type="default" @click="resetForm('adduserForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'AddUser',
        data(){
            var validateusername = (rule, value ,callback) => {
                if(value === '') {
                    callback(new Error('用户名不可为空。'))
                }else {
                    callback();
                }
            }
            var validatepass1 = (rule, value, callback) => {
                if(value === '') {
                    callback(new Error('密码不能为空'))
                }else {
                    if(this.rulesForm.password2 != '') {
                        this.$refs.adduserForm.validateField('password2')
                    }
                    callback();
                }
            }
            var validatepass2 = (rule, value, callback) => {
                if(value === "") {
                    callback( new Error('确认密码不能为空'))
                }else if (value !== this.rulesForm.password1) {
                    callback( new Error('两次密码不一致，请确认。'))
                }else {
                    callback()
                }
            }
            return {
                isAdmin: false,
                rulesForm: {
                    username: '',
                    password1: '',
                    password2: '',
                },
                rules: {
                    username: [
                        {
                            validator: validateusername,
                            trigger: 'blur'
                        }
                    ],
                    password1: [
                        {
                            validator: validatepass1,
                            trigger: "blur"
                        }
                    ],
                    password2: [
                        {
                            validator: validatepass2,
                            trigger: "blur"
                        }
                    ]
                }
            }
        },
        methods: {
            submitForm(formname){
                this.$refs[formname].validate((valid) => {
                    if(valid) {
                        let userData = {
                            username: this.rulesForm.username,
                            password: this.rulesForm.password1,
                            isAdmin: this.isAdmin
                        }
                        console.log(userData);
                        this.$http.post('/api/sysadmin/adduser',userData).then(res => {
                            let resData = res.body;
                            this.$message.success(resData.message)
                        })
                    }else {
                        this.$message.error('添加用户失败，请检查所填写的字段。')
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
    
</style>

