//使用严格模式（也可不使用）
"use strict";

const models = require('../db');
const express = require('express');
const router = express.Router();

var responseData = {}; //统一的返回数据

//修改密码
router.post('/api/user/changepwd' , (req, res) => {
    let user = req.body;
    console.log(user.password);
    models.login.findOne({username: user.username}, (error, userinfo) => {
        if(error) {
            responseData.code = "error";
            responseData.message = "修改密码失败，未找到此用户";
            res.json(responseData);
        }
        else if (user.oldpassword != userinfo.password) {
            console.log('error')
            responseData.code = "1";
            responseData.message = "旧密码错误，请确认";
            res.json(responseData);
        }
        else {
            let newpassword = {
                password: user.password
            };
            models.login.updateOne({_id:userinfo._id},{$set: newpassword} , (err, raw) => {
                if (err) {
                    responseData.code = "error";
                    responseData.message = "密码修改失败，请重试";
                    res.json(responseData);
                }else {
                    responseData.code = "success";
                    responseData.message = "密码修改成功";
                    res.json(responseData);
                }
            })

        }
    })
})

module.exports = router;