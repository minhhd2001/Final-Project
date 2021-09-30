const users = require('../model/users.model');
const userToken = require('../model/userToken.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = users.model;

const tokenSecret = 'group5'
const refreshSecret = 'bro';
const tokenExpired = '1h';
const refreshExpired ='3h';

const login = async (req, res, next) => {
    try{
        const userInDB = await User.findOne({email: req.body.email})
                                .then((user) => {
                                    return  user;
                                })
                                .catch((err) => {
                                    res.send(err);
                                })
        if(!userInDB || !bcrypt.compareSync(req.body.password, userInDB.password)) {
            return res.send('Tài khoản hoặc mật khẩu sai');
        }
        const userData = {
            id : userInDB.id,
            role : userInDB.role,
        }
        const token = jwt.sign(userData, tokenSecret, {
            expiresIn: tokenExpired
        })
        const refreshToken = jwt.sign(userData, refreshSecret,{
            expiresIn: refreshExpired
        })

        req.headers.authorization = token;

        const checkTokenExist = await userToken.findOne({idUser: userData.id})
                                                .then((result) => {
                                                    return result;
                                                })
                                                .catch((err) => {
                                                    res.send(err);
                                                });
        if(checkTokenExist) {
            await userToken.deleteOne({idUser: userData.id})
                .then()
                .catch((err)=>{
                    res.send(err);
                })
        }
        await new userToken({idUser: userData.id, refreshToken}).save();

        const role = userData.role;
        switch(role){
            case 'admin':
                res.redirect('/profile')
            break;
            case 'staff':
                res.json({
                    token : token,
                    refreshToken : refreshToken,
                    role : 'staff',
                })
            break;
            case 'trainer':
                res.json({
                    token : token,
                    refreshToken : refreshToken,
                    role : 'trainer',
                })
            break;
            default :
                res.json({
                    token : token,
                    refreshToken : refreshToken,
                    role : 'trainee',
                })
            break;
        }
        next();
    }catch(err){
        console.log(`Function : login`);
        console.log(err);
    }
}
const logout = async(req, res, next)=>{
    try{
        const token = req.headers.authorization;
        if(!token) return res.send('Unauthorized');
        jwt.verify(token, tokenSecret,(err, decode)=>{
            if(err) {
                return res.send(err);
            }
            req.id = decode.id;
        })
        await userToken.deleteOne({idUser:req.id})
            .then(()=>{
                next();
            })
            .catch((err) => {
                res.send(err);
            })
        req.headers.authorization = null;
        res.send('Login successful');
        next();
    }catch(err) {
        console.log(`Function : logout`);
        console.log(err);
    }
}

const refreshToken = async (req, res, next)=>{
    const token = req.headers.authorization;
    const {refreshToken} = req.body;
    if(!token || !refreshToken) return res.send('Unauthorized');
    jwt.verify(token, tokenSecret,(err, decode)=>{
        if(err) {
            return res.send(err);
        }
        req.id = decode.id;
        req.role = decode.role;
    })
    const result = await userToken.findOne({idUser: req.id})
            .then((result)=>{
                return result;
            })
            .catch((err)=> {
                res.send(err);
            })
            
    if(!result || !(refreshToken === result.refreshToken)){
        return res.send('Unauthorized users');
     }
    const userData = {
        id : req.id,
        role : req.role,
    }
    const newToken = jwt.sign(userData,tokenSecret,{
        expiresIn: tokenExpired
    })
    req.headers.authorization = newToken;
    res.json({
        token : newToken,
        refreshToken : refreshToken,
        message : 'Token has been created.'
    })
}
const auth = {
    login,
    refreshToken,
    logout
}
module.exports = auth;