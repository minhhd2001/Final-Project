const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');
const roles = require('./roles.model');
const rolesModel = roles.model;
const bcrypt = require('bcryptjs');

const user = new Schema({
    _id: Number,
    name : { type: String, min: 1, max: 50 },
    email : { type: String, min: 1, max: 100, unique: true },
    password : { type: String, min: 1},
    age : { type: Number, min: 1},
    phone : { type: String, min: 9},
    address : { type: String, min: 1, max: 255 },
    avatar : { type: String, default: "avatar.jpg"},
    role : { type: String, min: 1, ref: 'roles' },
},{
    _id: false,
    timestamps : { currentTime: () => Math.floor(Date.now() / 1000) },
});

user.plugin(AutoIncrement);
user.plugin(mongooseDelete,{overrideMethod: 'all', deleteAt: true});

const userModel = mongoose.model('User', user);

function initialize() {
    userModel.estimatedDocumentCount((err, count) => {
        if(!err && count === 0){
            rolesModel.findOne({name: 'admin'},(err,result) => {
                if(err && !result){
                    console.log(err);
                }
                else{
                    const salt = bcrypt.genSaltSync(10);
                    let passwordHash = bcrypt.hashSync('123456', salt);

                    new userModel({
                        name: 'admin',
                        email : 'admin@fpt.edu.vn',
                        password : passwordHash,
                        age: 20, 
                        phone : '0373569708',
                        address: 'Hà Nội',
                        role : result.name
                    }).save((err)=>{
                        if(err) console.log(err);
                        else console.log('Add admin user !');
                    })
                }
            })
        }
    })
}

const Users = {
    model : userModel,
    initialize: initialize(),
}
module.exports = Users;

