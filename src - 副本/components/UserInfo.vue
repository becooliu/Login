<template>
	<div class="user-info">
    <div class="us-face">
        <div class="img" style="background-image: url(../../static/0a.img1.jpg);"></div>
    </div>
    <div class="us-info-box">
        <div class="us-info-wrapper">
            <p class="name">Tcabu smacoao</p>
            <p class="us-level">普通会员</p>
        </div>
    </div>
		<h2 @click="deleteCookie()">this is user information . </h2>
	</div>
</template>

<script>
import store from '../../src/store'

export default {
  name: "UserInfo",
  data() {
    return {
      sessionName: "session",
      userData: ''
    };
  },
  methods: {
    deleteCookie() {
      this.delCookie(this.sessionName);
      this.checkLogin();
    },
    getUserInfo(){
      this.$store.dispatch('getUserInfo')
    }
  },
  mounted(){
    this.getUserInfo();
  }
};
</script>

<style scoped>
.user-info {
  background-color: #ff2951;
  zoom: 1;
}
.user-info:after {
  display: block;
  content: "";
  height: 0;
  visibility: hidden;
  clear: both;
}
.user-info .us-face {
  float: left;
  margin: 20px;
}
.user-info .us-face .img {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 100px;
  width: 100px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}
.user-info .us-info-box {
  margin-left: 150px;
  position: relative;
  height: 140px;
}
.user-info .us-info-box .us-info-wrapper {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  overflow: hidden;
}
.user-info .us-info-box .us-info-wrapper p {
  color: #fff;
  line-height: 28px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
.user-info .us-info-box .us-info-wrapper p.name {
  font-size: 18px;
}
.user-info .us-info-box .us-info-wrapper p.us-level {
  font-size: 16px;
}
</style>
