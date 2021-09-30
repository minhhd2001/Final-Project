const users = require('../model/users.model');
const bcrypt = require('bcryptjs');
const User = users.model;

const loginView = (req, res, next) => {
    res.render('login/index')
}

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
        req.session.user = userData;

        const role = userData.role;
        switch(role){
            case 'admin':
                res.redirect('/profile')
            break;
            case 'staff':
                res.redirect('/staff');
            break;
            case 'trainer':
                res.redirect('/profile')

            break;
            default :
                res.redirect('/profile')
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
        req.session.destroy();
        res.send('Login successful');
        next();
    }catch(err) {
        console.log(`Function : logout`);
        console.log(err);
    }
}

const auth = {
    login,
    logout,
    loginView
}
module.exports = auth;