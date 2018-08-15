//使用严格模式（也可不使用）
"use strict";

const models = require('./db');
const express = require('express');
const router = express.Router();

var responseData = {}; //统一的返回数据

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

//创建帐号接口
router.post('/api/login/createAccount' , (req, res) => {
    

    //查询是否有没有已存在的用户名
    models.login.findOne({username: req.body.username},function(error, userInfo) {
        if (error) { //如果查询失败
            return next(error);
        }else if(userInfo){ //如果查询返回了数据，则数据库中已存在此用户名
            responseData.code = "1";
            responseData.message = '该帐号已注册';
            res.json(responseData);
            return;
        }else { //如果数据库中没有此帐号，则将此用户数据插入到数据库中

            //req.body 之所以通用，是因为在index.js 中引入了 const bodyParser = require('body-parser')
            //获取前端传过来的参数
            //注意此处是操作mongodb ，使用model 来操作数据库
            var newAccount = new models.login({ 
                username: req.body.username, 
                password: req.body.password,
                isAdmin: req.body.isAdmin
            })
            newAccount.save((err , data) => {
                if( err ) { //插入数据失败，则返回错误
                    res.send(err)
                }else {
                    responseData.code = "2";
                    responseData.message = "帐号注册成功。";
                    res.json(responseData);
                    //res.send(responseData);
                }
            })
        }
    })
    /*************************************************/
    //把数据 newAccount 保存到mongodb 
    /* newAccount.save((err , data) => {
        if( err ) {
            res.send(err)
        }else {
            responseData.code = 2;
            responseData.message = "帐号注册成功。";
            
            res.send(res.json(responseData));
        }
    }) */
    /*************************************************/
    /* models.login.findOne({username: req.body.username}, function(err, userInfo) {
        if(err) {
            responseData.code = 'error';
            responseData.message = '查询错误，操作失败。'
            res.send(res.json(responseData));
            return;
        }else {
            if (userInfo) {
                responseData.code = 1;
                responseData.message = '该帐号已注册';
                res.json(responseData);
                return;
            }
            //把数据 newAccount 保存到mongodb 
            newAccount.save((err , data) => {
                if( err ) {
                    res.send(err)
                }else {
                    responseData.code = 2;
                    responseData.message = "帐号注册成功。";
                    
                    res.send(res.json(responseData));
                }
            })
        }
    }) */
    
})

router.get('/api/login/getAccount' , (req , res) => {
    //通过模型去查找数据库
    models.login.find( (err , data) => {
        if( err ) {
            res.send( err )
        }else {
            res.send(data)
        }
    })
})

module.exports = router;