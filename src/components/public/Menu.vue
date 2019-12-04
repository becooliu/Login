<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">处理中心</el-menu-item>
      
      <el-submenu index="2" class="user-action">
        <template slot="title">{{ this.username }}</template>
        <el-menu-item index="2-1" @click="logout()">登出</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
    name: "Menu",
    data() {
        return {
            activeIndex: "1",
            username: ''
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        logout(){
            this.delCookie('userSession');
            this.$router.push({'name':'Login'});
            this.$store.commit('$_removeStorage');
            this.isLogin = false;
        }
    },
    mounted(){
        this.username = this.getUserInfo();
    }
};
</script>
<style scoped>
    .user-action {
        float: right;
    }
</style>