//引入编写好的api
const api = require('./api')
const uploadPoster = require('./uploadPoster') //上传头像
//引入上传文件
//const postImg = require('./uploadImg')
//引入文件模块
const fs = require('fs')
//引入路径处理模块
const path = require('path')
//引入处理post 数据的模块
const bodyParser = require('body-parser')
//引入express
const express = require('express')

const app = express();
//引入node express-fileupload 模块
const fileUpload = require('express-fileupload');
app.use(fileUpload());

//解析 application/json
app.use(bodyParser.json());
//解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

//app.use(express.bodyParser({uploadDir: '../public/Uploads/images'}));
app.use(api);
app.use(uploadPoster);
//app.use(postImg);
//app.use(bodyParser({uploadDir: '../public/Uploads/images'}));


// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../public/Uploads/images')));

//允许跨域访问
app.use("*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    if (req.method === 'OPTIONS') {
      res.send(200)
    } else {
      next()
    }
  });

app.listen(8088);
console.log('success listen ......');