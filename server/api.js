//使用严格模式（也可不使用）
"use strict";

const models = require('./db');
const express = require('express');
const router = express.Router();

var responseData = {}; //统一的返回数据

//node 中图片的接收


/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

//创建帐号接口
router.post('/api/login/createAccount' , (req, res) => {
    
    //res.send(req.body.files);
    //查询是否有已存在的用户名
    models.login.findOne({username: req.body.username},function(error, userInfo) {
        if (error) { //如果查询失败
            responseData.code = 'error';
            responseData.message = '查询错误，操作失败。'
            res.json(responseData);
            //return;
        }else if(userInfo){ //如果查询返回了数据，则数据库中已存在此用户名
            responseData.code = "1";
            responseData.message = '该帐号已注册';
            res.json(responseData);
            //return;
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
    
})

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

//修改密码
router.post('/api/resetpass', (req , res) => {
    let userData = req.body;
    const condition = {username: userData.username};
    let update = {$set: {password: userData.password}};
    models.login.update(condition, update, function(error) {
        if (error) {
            responseData = {
                message: error,
                code: 'error'
            }
        }else {
            responseData = {
                message: '密码修改成功',
                code: '200'
            }
        }
        res.json(responseData)
    })
})

/***************管理员相关API******************/
//管理员添加用户
router.post('/api/sysadmin/adduser', (req , res) => {
    let userData = req.body;
    let condition = {username: userData.username};
    models.login.findOne(condition, (err, user) => {
        //如果查询发生错误
        if(err) {
            responseData = {
                code: 'error',
                message: '数据库连接错误，操作未完成。'
            }
            
        //如果查询成功，但返回了用户数据，表明数据库中已有相同名称的用户了
        }else if(user) {
            responseData = {
                code: '1',
                message: '该帐号已注册'
            }
        }else {
            let newUser = new models.login({
                username: userData.username,
                password: userData.password,
                isAdmin: userData.isAdmin
            })
            newUser.save((err, resp) => {
                if(err) {
                    responseData = {
                        code: 'error',
                        message: '新增用户失败，请重试。'
                    }
                }else {
                    responseData = {
                        code: '2',
                        message: '新增用户成功'
                    }
                }
            })
        }
        res.json(responseData);
    })
})

module.exports = router;