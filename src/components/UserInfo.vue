<template>
  <div>
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
				username: ''
			}
		};
	},

	methods: {
		
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw);
			this.$message.success(res.message);
			localStorage.userAvatar = res.imageUrl;
		},
		beforeAvatarUpload(file) {
			const isJPG = (file.type === "image/jpeg" || file.type === "image/png");
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
			}
			if (!isLt2M) {
				this.$message.error("上传头像图片大小不能超过 2MB!");
			}
			this.userData.username = this.getUserInfo();
			if (this.userData.username === "") {
				this.$message.error('请先登录。');
				this.$router.push({name: 'Login'});
			}
			return isJPG && isLt2M;
		}
	},
	mounted() {
		
		this.imageUrl = localStorage.userAvatar || "";
		//console.log(this.resImgSrc);
	}
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
