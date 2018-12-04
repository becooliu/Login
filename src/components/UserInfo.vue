<template>
<div>
	<div class="user-info">
		<div class="us-face">
			<div class="img" v-bind:style="{backgroundImage:'url('+ resImgSrc +')'}"></div>
		</div>
		<div class="us-info-box">
			<div class="us-info-wrapper">
				<p class="name">Tcabu smacoao</p>
				<p class="us-level">普通会员</p>
			</div>
		</div>
			
	</div>
		<div class="panel_body">
			
			<el-upload
				ref = 'upload'
				class="avatar-uploader"
				action="/api/uploadImg/postImg"
				:http-request="uploadImg"
				:show-file-list="false"
				:auto-upload="false" 
				:on-change="showFileName" 
				:on-success="handleAvatarSuccess"
				:before-upload="beforeAvatarUpload">
				
				<i v-if="!resImgSrc" class="el-icon-plus avatar-uploader-icon"></i>
				<el-button slot="trigger" type="primary" size="small">选取图片</el-button>
				<span>{{toUploadFileName}}</span>
				<el-button type="success" size="small" style="margin-left: 15px;" @click="submitUpload">上传图片</el-button>
			</el-upload>
		</div>

</div>
</template>

<script>
import store from "../../src/store";

export default {
	name: "UserInfo",
	data() {
		return {
			showChangeInput: false,
			avatar: "",
			correctImgType: false, //当前文件类型是否为限制的文件类型
			sessionName: "session",
			userData: "",
			resImgSrc: '../static/0a.img1.jpg',
			toUploadFileName: ''
			/* styleObject: {
				backgroundImage: "url(../static/0a.img1.jpg);"
			} */
		};
	},
	methods: {
		handleAvatarSuccess(res, file) {
			this.resImgSrc = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			/* const isJPG = file.type === 'image/jpeg';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			} */
			const isIMG = file.type.indexOf('image/') > -1;
			const isLmt2Mb = file.size /1024 /1024 < 2;
			if(!isIMG) {
				this.$message.error('只能上传图片格式！');
			}
			if(!isLmt2Mb) {
				this.$message.error('上传头像图片大小不能超过 2MB!')
			}
			return isIMG && isLmt2Mb;
		},
		submitUpload(){
			this.$refs.upload.submit();
		},
		deleteCookie() {
			this.delCookie(this.sessionName);
			this.checkLogin();
		},
		validateFile(file , fileList){
			//console.log(file.raw); //file.raw 获取未经处理过的文件对象
			return file.raw.type.indexOf('image/') > -1;
		},
		showFileName(file , filelist) {
			if(this.validateFile(file , filelist) == false) {
				this.$message.error('只能上传图片格式！');
				return false;
			}
			this.toUploadFileName = file.name;
		},
		changeAvatar(event) {
			var imgs = event.target.files || event.dataTransfer.files;
			console.log(imgs.name);
			if (!imgs.length) return; //判断图片是否为空

			this.avatar = imgs[0];
				//判断是否上传的是图片格式的文件
			if (this.avatar.type.indexOf("image/") <= -1) {
				this.correctImgType = false;

				window.alert("请选择以下正确的图片格式：.jpg,.jpeg,.png,.bmp,.gif");
				return false;
			} else {
				this.correctImgType = true;
			}

		},
		uploadImg(param){ //使用element-ui 自定义上传
			//
			if(this.beforeAvatarUpload == false) {
				return
			}
			var username = this.getCookie('userSession');
			var formData = new FormData();
			var fileObj = param.file;
			const fileController = '/api/uploadImg/postImg';
			formData.append('avatar',fileObj);
			formData.append('userSession',username);
			this.$http
			.post(fileController, formData)
			.then(res => {
				this.resImgSrc = res.body.imgSrc;
				localStorage.userface = res.body.imgSrc;
				this.$message({
					message: res.body.message,
					type: 'success'
				})
			})
			.catch(error=> {
				if(this.$store.getters.getTokenStatus === 'invalid') {
					this.checkToken();
				}
			})
		}
	},
	mounted() {
		this.resImgSrc = localStorage.userface;
		//console.log(this.resImgSrc);
	}
};
</script>

<style scoped>
/* element-ui style */
.avatar-uploader {
	margin-top: 15px;
}
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409EFF;
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
	width: 100px;
	height: 100px;
	display: block;
	border-radius: 50%;
}
/* element-ui style end */
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
