const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userToken = new Schema({
    idUser : { 
        type: Schema.Types.ObjectId, 
        unique: true , 
        ref: 'users'},
    refreshToken : { type: String, unique: true }
},{
    timestamps : { currentTime: () => Math.floor(Date.now() / 1000) },
});

module.exports = mongoose.model('usertokens', userToken);