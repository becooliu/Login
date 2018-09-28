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
			<h2 @click="deleteCookie()">this is user information . </h2>
	</div>
		<div class="panel_body">
			<!-- <label for='my_file' class="theme-color">
			<mu-icon left value="backup"></mu-icon>
			修改头像
			</label>
			<input type="file" ref="upload" name="avatar" id='my_file' style="display:none;" accept="image/jpg" @change="changeAvatar" /> -->
			
			
			<form action="/api/uploadImg/postImg" method="post" enctype="multipart/form-data">
				<div class="field clearfix">
					<label for="uploadFile">用户头像：</label>
					<input type="file" id="uploadFile" accept="image/*" placeholder="请上传头像" name="avatar" ref="avatar" @change="changeAvatar" >
				</div>
				
				<div class="field field_btn clearfix" style="text-align: center;">
					<a href="javascript:void(0);" class="btn btn-default btn_login2" @click="postImg">提交</a>
				</div>
			</form>
			<el-upload
				ref = 'upload'
				class="avatar-uploader"
				action="/api/uploadImg/postImg"
				:http-request="uploadImg"
				:show-file-list="false"
				:auto-upload="false" 
				:on-success="handleAvatarSuccess"
				:before-upload="beforeAvatarUpload">
				<img v-if="resImgSrc" :src="resImgSrc" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				<el-button slot="trigger" type="primary" size="small">选取文件</el-button>
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
			/* styleObject: {
				backgroundImage: "url(../static/0a.img1.jpg);"
			} */
		};
	},
	/* watch: {
		resImgSrc: function(newValue, oldValue){
			console.log(this.styleObject);
			this.styleObject.backgroundImage = "url("+ this.resImgSrc +")";
		}
	}, */
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
				this.$message.error('上传图片只能是图片格式！');
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
		getUserInfo() {
			this.$store.dispatch("getUserInfo");
		},
		changeAvatar(event) {
			var imgs = event.target.files || event.dataTransfer.files;
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
			if(!this.beforeAvatarUpload) {
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
		},
		postImg() {
			if (this.correctImgType == false) {
				window.alert("请选择以下正确的图片格式：.jpg,.jpeg,.png,.bmp,.gif");
				return false;
			}
			var username = this.getCookie('userSession');
			var formData = new FormData();
			formData.append("avatar", this.avatar); //使用FormData，第一个参数为input的name，第二个参数为文件对象
			formData.append('userSession',username);
			this.$http
				.post("/api/uploadImg/postImg", formData)
				.then(res => {
					
					this.resImgSrc = res.body.imgSrc;
					//this.styleObject.backgroundImage = "url("+res.body.imgSrc+");"
					
					//console.log(this.styleObject.backgroundImage);
					localStorage.userface = res.body.imgSrc;
					
					//console.log(localStorage.userInfo);
					window.alert(res.body.message);
				})
				.catch(err => {
				window.alert(err);
				});

			//以下为vue-resource post的详细写法，同样可以用
			/*  this.$http({
					method: 'POST',
					url: '/api/uploadImg/getImg',
					headers: {
						'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
					},
					body: formData
				}).then(res=>{
					console.log(res.body.message)
				}) */
		}
	},
	mounted() {
		this.getUserInfo();
		this.resImgSrc = localStorage.userface;
		//console.log(this.resImgSrc);
	}
};
</script>

<style scoped>
/* element-ui style */
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
