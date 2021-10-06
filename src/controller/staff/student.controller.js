const Students = require('../../model/users.model').model;
const Roles = require('../../model/roles.model');
//const Courses = require('../../model/courses.model');

//[GET] /staff/viewStudent/create
const create = (req, res, next) => {

    res.render('staff/students/createStudent');
}

//[POST] /staff/viewStudent/store
const store = (req, res, next) => {
    new Students({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        phone: req.body.phone,
        address: req.body.address,
        role: 'trainee'
    }).save(err => {
        if(err){
            next(err);
        }else{
            res.redirect('/staff/viewStudent');
        }
    })
}

//[GET] /staff/viewStudent
const show = async(req, res, next) => {
    await Students.find({role: 'trainee'})
        .then(students => {
            res.render('staff/students/viewStudent', {
                students: students,
            })
        })
        .catch(next);
}

//[GET] /staff/viewStudent/:id/edit
const edit = (req, res, next) => {
    Students.findOne({ _id: req.params.id })
        .then(student => {
            res.render('staff/students/editStudent', {
                student: student,
            })
        })
        .catch(next)
}

//[PUT] /staff/viewStudent/:id
const update = (req, res, next) => {
    Students.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect('/staff/viewStudent'))
        .catch(next)
}

//[DELETE] /staff/viewStudent/:id
const deleteS = async(req, res, next) => {
    // let courses = await Courses.find({idStudent: req.params.id})
    //     .then(courses => {
    //         return users
    //     })
    //     .catch(next) 
    // if(courses.length) {
    //     return res.send('A course already exists in this student. Please delete the course first')
    // }
    Students.deleteOne({ _id: req.params.id})
        .then(() => {
            res.redirect('/staff/viewStudent')
        })
        .catch(next)       
}

//[GET] /staff/viewStudent/search
const search = async(req, res, next) => {
    //console.log(req.query.search);
    const student = await Students.findOne({$and:[{name : req.query.search}, {role: 'trainee'}]})
            .then(student =>{
                return student
            })
            .catch(next)
            //console.log(user);
        if(student){
            return res.render('staff/students/viewStudent',{
                student : student,
            })
        }
        const searchStudent = new RegExp(req.query.search, 'i')
        await Students.find({$and:[{name : searchStudent}, {role: 'trainee'}]})
            .then(students =>{
                res.render('staff/students/viewStudent',{
                    students: students,
                })
            })
            .catch(next)
            
}

const student = {
    create,
    store,
    show,
    edit,
    update,
    deleteS,
    search
}

module.exports = student