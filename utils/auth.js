const jwt = require('jsonwebtoken')
const users = require('..//src//models/users')
const authentication_use = async(req,res,next) =>{
try{
let decode = req.cookies;
let {token} = decode;
if (!token) {
    return res.status(401).send("Token not found");
}
const verify = await jwt.verify(token,"DEV@1234");
console.log(verify)

const {_id} = verify;
console.log(_id)
const data = await users.findOne({_id:_id})
if(!data){
    throw new Error("Access denied")
}
req.data = data;
next()}
catch(err){
    res.status(400).send("error : "+err)
}

}

module.exports = authentication_use;