//修改用户头像
'use strict'

const models = require('./db');
const express = require('express');
const router = express.Router();

const responseData = {};

router.post('/api/uploadImg/uploadPoster' , (req, res) => {
    let file = req.files.file;
    let username = req.body.username;
    file.mv('../static/Uploads/images/'+file.name , (err) => {
        if(err) {
            responseData = {
                message: "修改头像失败，请联系管理员",
                code: 'error'
            }
            return res.json(responseData);
        }

        let condition = {username: username};
        let update = {$set: {file: '../static/Uploads/images/'+file.name}};
        models.login.update(condition, update, (err) => {
            if (err) {
                responseData = {
                    message: err,
                    code: 'error'
                }
            }else {
                responseData.message = "恭喜，头像上传成功！";
                responseData.code = "200";
                responseData.imageUrl = "../static/Uploads/images/"+file.name;
                /* responseData = {
                    message: '头像修改成功！',
                    code: "200",
                    imageUrl: '../static/Uploads/images/'+file.name
                } */
            }
            res.json(responseData);
        })
    })
})

module.exports = router;
