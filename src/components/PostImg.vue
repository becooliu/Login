<template>
  <div class="login_wrapper">
        <div class="panel_header">
            <h2>上传头像</h2>
        </div>
        <div class="panel_body">
            <!-- <label for='my_file' class="theme-color">
            <mu-icon left value="backup"></mu-icon>
            修改头像
            </label>
            <input type="file" ref="upload" name="avatar" id='my_file' style="display:none;" accept="image/jpg" @change="changeAvatar" /> -->
            <form action="/api/uploadImg/getImg" method="post" enctype="multipart/form-data">
                <div class="field clearfix">
                    <label for="uploadFile">用户头像：</label>
                    <input type="file" id="uploadFile" accept="image/*" placeholder="请上传头像" name="avatar" ref="avatar" @change="changeAvatar" >
                </div>
                
                <div class="field field_btn clearfix" style="text-align: center;">
                    <a href="javascript:void(0);" class="btn btn_login2" @click="postImg">提交</a>
                </div>
                
                
                
            </form>
        </div>
    </div>
</template>
<script>
    export default {
        name: "PostImg",
        data(){
            return {
                avatar:'',
                correctImgType: false //当前文件类型是否为限制的文件类型
            }
        },
        methods: {
            changeAvatar(event){
                var imgs = event.target.files || event.dataTransfer.files;
                if(!imgs.length) return; //判断图片是否为空

                this.avatar = imgs[0];
                if(this.avatar.type.indexOf('image/') <= -1) { //判断是否上传的是图片格式的文件
                    this.correctImgType = false;

                    window.alert('请选择以下正确的图片格式：.jpg,.jpeg,.png,.bmp,.gif');
                    return false;
                }
                else {
                    this.correctImgType = true;
                }
            },
            postImg(){
                
                if(this.correctImgType == false) {
                    window.alert('请选择以下正确的图片格式：.jpg,.jpeg,.png,.bmp,.gif');
                    return false;
                }
                var formData = new FormData();
                formData.append('avatar',this.avatar); //使用FormData，第一个参数为input的name，第二个参数为文件对象
                this.$http.post('/api/uploadImg/getImg', formData).then(res=> {
                    window.alert(res.body.message);
                }).catch(err=> {
                    window.alert(err)
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
        }
    }
</script>
