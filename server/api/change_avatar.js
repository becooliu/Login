//使用严格模式（也可不使用）
"use strict";

const models = require('../db');
const express = require('express');
const router = express.Router();

var responseData = {}; //统一的返回数据

//上传图片并保存
router.post('/api/uploadImg/postImg' , (req, res) => {
    let avatar = req.files.avatar; //获取前端上传的文件对象
    let userName = req.body.userSession;
    // console.log('avatar='+req.files.avatar);
    // console.log('avatar.name='+req.files.avatar.name);
    
    avatar.mv('../static/Uploads/images/'+avatar.name, function(err) { //avatar.mv 是express 自带的文件操作方法
        if(err) {
            responseData={
                message: "修改失败，请联系系统管理员。",
                code: "error"
            }
            return res.json(responseData)
        }
        //更新数据库中的指定的值
        var temp_imgType = avatar.name.split('.');
        //var imgType = temp_imgType[temp_imgType.length-1];
        const condition = {username: userName};
        let update = {$set: {avatar: '../static/Uploads/images/'+avatar.name}};
        models.login.update(condition, update, function(error){
            if (error) {
                responseData = {
                    message: error,
                    code: 'error'
                }
            }else {
                responseData = {
                    message: "图片上传成功！",
                    code: "200",
                    imgSrc: "../static/Uploads/images/"+avatar.name
                }
                
                console.log("server res img="+responseData.imgSrc);
            }
            res.json(responseData);
        })
    })
})


module.exports = router;