const users = require('../model/users.model');
const categories = require('../model/categories.model');
const Course = require('../model/courses.model');
const Category = categories.model;
const User = users.model;

const update = async (req, res, next) => {
    try {
        const avatar = req.file.filename;
    await User.updateOne({$and:[{_id: 2},{role: 'trainer'}]},{
        avatar: avatar,
        phone : req.body.phone,
        address: req.body.address,
        age: req.body.age,
        name: req.body.name,
    }).then(()=> res.redirect('/profile'))
        .catch((err) => {
            res.send(err);
        })
    }catch(err) {
        console.log(err);
    }
}

const showCourse = async (req, res, next) => {
   try {
        const courses = await Course.find({idTrainer: 2})
                    .then((results)=>{
                        if(!results) return res.send('Chưa được phân công khóa học nào !');
                        // console.log(results);
                        return results;
                    })
                    .catch((err) => {
                        res.send(err);
                    })
                console.log(courses)
        for(let course of courses) {
            let category = await Category.findOne({_id: course.idCategory})
                .then((result)=>{
                    return result;
                })
                .catch((err) => {
                    return res.send(err);
                })
            course.category = category.name;
        }
        const results = courses.map((course) => {
            return {
                id: course.id,
                name: course.name,
                category: course.category,
                quantity: course.idTrainee.length
            }
        });
        res.json(results);
        next();

   }catch(err){
       console.log(err);
   }
}


const showStudents = async (req, res, next) => {
    try{
        const idTrainees = await Course.findOne({_id: '615483d9c054f8a1cbd1a6b8'})
                            .then((result) => {
                                if(!result) return res.send('Not found');
                                return result.idTrainee;
                            })
                            .catch((err) => {
                                return res.send(err);
                            })
            res.json(idTrainees);
    }catch(err){
        console.log(err);
    }
}

const trainer = {
    update,
    showCourse,
    showStudents
}

module.exports = trainer;
