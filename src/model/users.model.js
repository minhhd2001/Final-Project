const mongoose = require('mongoose');
const roles = require('./roles.model');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const rolesModel = roles.model;

const user = new Schema({
    name : { type: String, minlength: 1, maxlength: 50 },
    email : { type: String, minlength: 1, maxlength: 100, unique: true },
    password : { type: String, minlength: 1},
    age : { type: Number, minlength: 1},
    phone : { type: String, minlength: 9},
    address : { type: String, minlength: 1, maxlength: 255 },
    avatar : { type: String, minlength: 1},
    idRole : { type: Schema.Types.ObjectId, ref: 'roles' },
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
                if(err){
                    console.log(err);
                }
                else{
                    new userModel({
                        _id: 1,
                        name: 'admin',
                        email : 'admin@fpt.edu.vn',
                        password : '123456',
                        age: 20, 
                        phone : '0373569708',
                        address: 'Hà Nội',
                        avatar : 'avatar', 
                        idRole : result._id
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

