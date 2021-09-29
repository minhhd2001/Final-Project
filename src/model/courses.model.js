const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const category = require('./categories.model');
const Schema = mongoose.Schema;
const categoryModel = category.model;

const course = new Schema({
    name : { type: String, min: 1, max: 50 },
    description : { type: String},
    idCategory : {type: Schema.Types.ObjectId, ref: 'category'},
    idTrainer : {type: Number, ref: 'user'},
    idTrainee: [{type: Number, ref: 'user'}]
},{
    timestamps : { currentTime: () => Math.floor(Date.now() / 1000) },
});

course.plugin(mongooseDelete,{overrideMethod: 'all', deleteAt: true});

module.exports = mongoose.model('courses', course);

// const courseModel = mongoose.model('courses', course);

// function initialize(){
//     categoryModel.findOne({name:'IT'},(err, result) => {
//         new courseModel({
//             name: 'Application',
//             description: 'Application',
//             idCategory: result._id,
//             idTrainer: 2,
//             idTrainee: [3, 4]
//         }).save((err)=>{
//             if(err) console.log(err);
//             else console.log('Add course successful !');
//         })
//     })
// }

// const Courses = {
//     model: courseModel,
//     initialize : initialize,
// };

// module.exports = Courses;