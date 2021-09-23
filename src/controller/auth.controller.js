const Users = require('../model/users.model');
const user = require('../model/users.model');

module.exports = (req,res,next) => {
    Users.model.find({},(err, result) => {
        res.json(result);
    })
}