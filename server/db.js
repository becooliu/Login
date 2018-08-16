// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost:27017/commpany');

//为连接绑定事件
const db = mongoose.connection;
db.once('error', ()=>console.log('database connect error.'));
db.once('open' , ()=> console.log('Mongo connect success .'));

/**定义登录模式loginSchema**/
const loginSchema = mongoose.Schema({
    username: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

//定义模型
const Models = {
    login: mongoose.model('users',loginSchema)
}

module.exports = Models;