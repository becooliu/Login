'use strict'

const models = require('./db');
const express = require('express');
const router = express.Router();

var responseData = {}; //统一的返回数据

//上传图片并保存
router.post('/avatar/uploadImg/postImg' , (req, res) => {
    let avatar = req.files.avatar; //获取前端上传的文件对象
    let userName = req.body.userSession;
    
    avatar.mv('../public/Uploads/images/'+avatar.name, function(err) { //avatar.mv 是express 自带的文件操作方法
        if(err) {
            responseData={
                message: "修改失败，请联系系统管理员。",
                code: "error"
            }
            return res.json(responseData)
        }
        //更新数据库中的指定的值
        const condition = {username: userName};
        let update = {$set: {avatar: '../public/Uploads/images/'+avatar.name}};
        models.login.update(condition, update, function(error){
            if (error) {
                responseData = {
                    message: error,
                    code: 'error'
                }
            }else {
                responseData.message = '图片上传成功！';
                responseData.code = '200'
                
            }
        })
    })
    res.json(responseData);
})

module.exports = router;