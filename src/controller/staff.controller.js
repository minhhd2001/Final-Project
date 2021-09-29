const Categories = require('../model/categories.model').model;

//[GET] /staff
const index = (req, res, next) => {

    res.render('staff');
}

//>>>>>>>>>>>>>>>>>>>HANDLE CATEGORY<<<<<<<<<<<<<<<<<<<<<<<
//[GET] /staff/viewCategory/create
const create = (req, res, next) => {

    res.render('createCategory');
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
            res.render('viewCategory', {
                categories: categories,
            })
        })
        .catch(next);
}

//[GET] /staff/viewCategory/:id/edit
const edit = (req, res, next) => {
    Categories.findOne({ _id: req.params.id })
        .then(category => {
            res.render('editCategory', {
                category: category,
            })
        })
        .catch(next)
}

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
            return res.render('viewCategory',{
                category: category,
            })
        }
        const searchCategory = new RegExp(req.query.search, 'i')
        await Categories.find({name : searchCategory})
            .then(categories =>{
                res.render('viewCategory',{
                    categories: categories,
                })
            })
            .catch(next)    
}

//[DELETE] /staff/viewCategory/:id
const destroy = (req, res, next) => {
    confirm('hi')
}


const staff = {
    index,
    create,
    store,
    show,
    edit,
    update,
    search,
    destroy,
}
module.exports = staff;