//使用严格模式（也可不使用）
"use strict";

const models = require('../db');
const express = require('express');
const router = express.Router();

var responseData = {}; //统一的返回数据

//帐号登录接口
router.post('/api/login/getAccount' , (req , res) => {
    
    //通过模型去查找数据库
    models.login.findOne({username: req.body.username}, function(error , data) {
        if( error ) {
            responseData.code = "0";
            responseData.message = "登录失败，请联系管理员。";
            res.json(responseData);
        }else if(data) {
            console.log(data);

            let loginAccount = {
                username: req.body.username,
                password: req.body.password
            }
            if(loginAccount.username == data.username && loginAccount.password == data.password) {
                /* responseData.code = "2";
                responseData.message = "登录成功"; */
                
                responseData = {
                    code: "2",
                    message: "登录成功。"
                }
                res.json(responseData);
            }else {
                responseData.code = "3";
                responseData.message = "帐号或密码错误，请确认。"
                res.json(responseData);
            }
        }else {
            responseData.code = "4";
            responseData.message = "帐号不存在，请确认。"
            res.json(responseData);
        }
    })
    responseData = {};
})

module.exports = router;