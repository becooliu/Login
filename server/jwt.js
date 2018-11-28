const jwt = require('jsonwebtoken')
const secretOrPrivateKey = 'usertoken'

class Jwt{
    constructor(data) {
        this.data = data;
    }
    //生成token
    generateToken(){
        let created = Math.floor(Date.now() / 1000);
        let token = jwt.sign(this.data, secretOrPrivateKey, {expiresIn: created + 60*60 });
        return token;
    }

    //校验token
    verifyToken() {
        let token = this.data;
        let res;
        try {
            let result = jwt.verify(token,secretOrPrivateKey);
            let current = Math.floor(Date.now() / 1000);
            let {exp = 0} = result;
            if(current <= exp) {
                res = result.data || {};
            }
        }catch(e) {
            return e
        }
        return res
    }
}

module.exports  = Jwt;