const jwt = require('jsonwebtoken')
const secretOrPrivateKey = 'usertoken'

//定义生成、校验token的类
class Jwt{
    constructor(data) {
        this.data = data;
    }
    //生成token
    generateToken(){
        //let created = Math.floor(Date.now() / 1000);
        let token = jwt.sign(this.data, secretOrPrivateKey, {expiresIn: '45s' });
        return token;
    }

    //校验token
    verifyToken() {
        let token = this.data;
        let res;
        jwt.verify(token,secretOrPrivateKey, function(err, decode) {
            if (err) {
                res = {
                    code: 'token_error',
                    message: '不合法的token,或者token 已过期，请重新登录。'
                }
            }else {
                res = decode
            }
        })
        return res
    }
}

module.exports  = Jwt;