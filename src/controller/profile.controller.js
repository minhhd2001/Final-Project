const users = require('../model/users.model');
const User = users.model;

const profile = async (req, res, next) => {
    let user;
    await User.findOne({_id: req.id}).then(function (result) {
        user = {
            email: result.email,
            name: result.name,
            age: result.age,
            avatar: result.avatar,
            phone: result.phone,
            address: result.address, 
            role: result.role
        }
    })
    res.render('index',{user});
}

module.exports = profile;