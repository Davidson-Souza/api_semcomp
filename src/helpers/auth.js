const jwt = require('jsonwebtoken');
const fs = require('fs');
const {sanitize} = require("./sanitize")

const key = fs.readFileSync("./secret");

module.exports.auth = (req, res, next) =>
{
    const cookie = req.headers.cookie;
    
    if(!sanitize(cookie))
        return res.status(403).json({ok:false, data:"Bad request"});
    
    let token;
    if(!cookie)
        return res.status(401).json({ok: false, data: "Missing auth cookie"});
    try {
        token = jwt.verify(cookie, key)
    } catch(e){
        return res.status(401).json({ok: false, data: "Invalid jwt token"});
    }
    if (token.exp > Math.floor(Date.now() / 1000) + (60 * 60))
        return res.status(401).json({ok: false, data: "Token Expired"});
    req.user = token.data;
    next();
}
module.exports.create = async (id) => 
{
    if(!id) return false;
    const token = await jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: id
      }, key);
    return token;
}