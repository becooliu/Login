<template>
	<div class="login_wrapper">
        <div class="panel_header">
            <h2>修改密码</h2>
        </div>
        <div class="panel_body">
          <el-form ref="form" label-position="right" label-width="80px">
            <el-form-item label="旧密码">
              <el-input v-model="oldpassword" name="oldpassword" ref="oldpassword" placeholder="请输入旧密码" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="password" name="password" ref="password" placeholder="请输入新密码" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="repassword" name="repassword" ref="repassword" placeholder="请再次输入新密码" type="password"></el-input>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="changePwd()">确认修改</el-button>
              <el-button type="default">清空</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
</template>
<script>
export default {
  name: "ChangePwd",
  data() {
    return {
      oldpassword: "",
      password: "",
      repassword: "",
      style: {
        apply: "apply",
        orange: "orange"
      }
    };
  },
  methods: {
    checkPwd(){ //检查是否为空
       return this.oldpassword && this.password && this.repassword;
    },
    comparePwd(){ //检查两次的密码是否一致
      return this.password && this.repassword && this.password == this.repassword;
    },
    changePwd(){
      if (!this.checkPwd()) {
        this.$message.error('旧密码、新密码、确认密码不能为空');
        return;
      }
      if (!this.comparePwd()) {
        this.$message.error('两次输入的密码需一致，且不能为空');
        return;
      }
      if (this.password == this.oldpassword) {
        this.$message.error('新密码与旧密码相同，无需修改');
        return;
      }
      let userData = {
        username: this.$store.getters.getStorage,
        password: this.password,
        oldpassword: this.oldpassword
      }

      this.$http.post('/api/user/changepwd',userData, {emulateJSON: true}).then(res => {
        if ( res.body.code != 'success') {
          this.$message.error(res.body.message);
        }else {
          this.$message.success(res.body.message);
        }
      })
    }
  }
};
</script>
