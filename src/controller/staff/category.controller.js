const Categories = require('../../model/categories.model').model;
const Courses = require('../../model/courses.model');

//[GET] /staff/viewCategory/create
const create = (req, res, next) => {

    res.render('staff/categories/createCategory');
}

//[POST] /staff/viewCategory/store
const store = (req, res, next) => {
    new Categories({
        name: req.body.name
    }).save(err => {
        if(err){
            next(err);
        }else{
            res.redirect('/staff/viewCategory');
        }
    })
}

//[GET] /staff/viewCategory
const show = async(req, res, next) => {
    await Categories.find({})
        .then(categories => {
            res.render('staff/categories/viewCategory', {
                categories: categories,
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

// //[GET] /staff/viewCategory/:id/edit
// const edit = (req, res, next) => {
//     Categories.findOne({ _id: req.params.id })
//         .then(category => {
//             res.render('staff/categories/editCategory', {
//                 category: category,
//             })
//         })
//         .catch(next)
// }

//[PUT] /staff/viewCategory/:id
const update = (req, res, next) => {
    Categories.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect('/staff/viewCategory'))
        .catch(next)
}

//[GET] /staff/viewCategory/search
const search = async(req, res, next) => {
    const category = await Categories.findOne({name : req.query.search})
            .then(category =>{
                return category
            })
            .catch(next)
        if(category){
            return res.render('staff/categories/viewCategory',{
                category: category,
            })
        }
        const searchCategory = new RegExp(req.query.search, 'i')
        await Categories.find({name : searchCategory})
            .then(categories =>{
                res.render('staff/categories/viewCategory',{
                    categories: categories,
                })
            })
            .catch(next)    
}

//[DELETE] /staff/viewCategory/:id
const destroy = async(req, res, next) => {
    let courses = await Courses.find({idCategory: req.params.id})
        .then(courses => {
            return courses
        })
        .catch(next) 
    if(courses.length) {
        return res.send('A course already exists in this category. Please delete the course first')
    }
    Categories.deleteOne({ _id: req.params.id})
        .then(() => {
            res.redirect('/staff/viewCategory')
        })
        .catch(next)       
}

const category = {
    create,
    store,
    show,
    edit,
    update,
    search,
    destroy,
}

module.exports = category