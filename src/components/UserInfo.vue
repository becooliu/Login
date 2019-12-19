<template>
  <div class="box userinfo-box">
    <el-row>
		<el-col :span="6">
			<el-upload
				class="avatar-uploader"
				action="/api/uploadImg/uploadPoster"
				:data="userData"
				:show-file-list="false"
				:on-success="handleAvatarSuccess"
				:before-upload="beforeAvatarUpload"
			>
			<img v-if="imageUrl" :src="imageUrl" class="avatar" />
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		</el-col>
		<el-col :span="18">
			<span class="user-name">{{ getUsername }}</span>
		</el-col>
    </el-row>
    
  </div>
</template>

<script>
import store from "../../src/store";

export default {
  name: "UserInfo",
  data() {
    return {
      imageUrl: "",
      userData: {
        username: ""
      },
      imgType: ["image/jpg", "image/png", "image/svg+xml"]
    };
  },
  computed: {
	  getUsername(){
		  return this.$store.getters.getStorage;
	  }
  },

  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$message.success(res.message);
      localStorage.userAvatar = res.imageUrl;
    },
    beforeAvatarUpload(file) {
      //检查文件格式
      let fileType = file.type;
      let isImg = false;
      for (let item in this.imgType) {
        if (fileType == item) {
          isImg = true;
        }
        return;
      }

      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImg) {
        this.$message.error("上传头像图片只能是jpg, png, svg图片格式");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }

      this.userData.username = this.$store.getters.getStorage;
      if (this.userData.username === "") {
        this.$message.error("请先登录。");
        this.$router.push({ name: "Login" });
        return;
      }
      console.log(file.type);
      return isImg && isLt2M;
    }
  },
  mounted() {
    this.imageUrl = localStorage.userAvatar || "";
    //console.log(this.resImgSrc);
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
}
.avatar-uploader .el-upload:hover {
  background-color: rgba(0, 0, 0, 0.15);
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: contain;
}
</style>
