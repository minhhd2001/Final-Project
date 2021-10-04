const Courses = require('../../model/courses.model');
const Categories = require('../../model/categories.model').model;
const Users = require('../../model/users.model').model;

//[GET] /staff/viewCourse
const show = async (req, res, next) => {
    const countDocumentsDeleted = await Courses.countDocumentsDeleted()
        .then(countDeleted => {
            return countDeleted
        })
        .catch(next);
    const courses = await Courses.find({})
        .then(courses => {
            return courses
        })
        .catch(next);

    await Categories.find({})
        .then(categories => {
            res.render('staff/courses/viewCourses', {
                courses: courses,
                categories: categories,
                countDocumentsDeleted
            })
        })
        .catch(next);
}
//[GET] /staff/viewCourse/create
const create = async (req, res, next) => {
    const categories = await Categories.find({})
        .then(categories => {
            return categories
        })
        .catch(next);
    if (categories.length > 0) {
        return res.render('staff/courses/create', {
            categories: categories,
        })
    }
}
//[POST] /staff/viewCourse/store
const store = (req, res, next) => {
    new Courses(req.body).save(err => {
        if (err) {
            return next(err);
        }
        res.redirect('/staff/viewCourses');
    })
}

//[GET] /staff/viewCourse/:id/edit
const edit = async (req, res, next) => {
    const categories = await Categories.find({})
        .then(categories => {
            return categories
        })
        .catch(next);
    await Courses.findOne({ _id: req.params.id })
        .then(course => {
            res.render('staff/courses/edit', {
                categories: categories,
                course: course,
            })
        })
        .catch(next);
}
//[PUT] /staff/viewCourse/:id
const update = async (req, res, next) => {
    await Courses.updateOne({ _id: req.params.id }, req.body)
        .then(() => {
            res.redirect('/staff/viewCourses')
        })
        .catch(next);
}

//[GET] /staff/viewCourse/search
const search = async (req, res, next) => {
    const course = await Courses.findOne({ name: req.query.search })
        .then(course => {
            return course
        })
        .catch(next);
    const categories = await Categories.find({})
        .then(categories => {
            return categories
        })
        .catch(next);
    if (course) {
        return res.render('staff/courses/viewCourses', {
            course: course,
            categories: categories,
        })
    }
    const searchCourses = new RegExp(req.query.search, 'i');
    await Courses.find({ name: searchCourses })
        .then(courses => {
            return res.render('staff/courses/viewCourses', {
                courses: courses,
                categories: categories,
            })
        })
}
//[DELETE] /staff/viewCourse/:id
const destroy = async (req, res, next) => {
    await Courses.delete({ _id: req.params.id })
        .then(() => {
            res.redirect('back')
        })
}
//[GET] /staff/viewCourse/trash/store
const storeTrash = async (req, res, next) => {
    const courses = await Courses.findDeleted({})
        .then(courses => {
            return courses
        })
        .catch(next);
    await Categories.find({})
        .then(categories => {
            res.render('staff/courses/trash', {
                courses: courses,
                categories: categories,
            })
        })
        .catch(next);
}

//[PUT] /staff/viewCourse/:id/restore
const restore = async (req, res, next) => {
    await Courses.restore({ _id: req.params.id })
        .then(() => {
            res.redirect('back')
        })
        .catch(next);
}
//[DELETE] /staff/viewCourse/:id/force
const deleteForce = async (req, res, next) => {
    await Courses.deleteOne({ _id: req.params.id })
        .then(() => {
            res.redirect('back')
        })
}
//[GET] /staff/viewCourse/:id
const showDetail = async (req, res, next) => {
    const trainers = await Users.find({ role: 'trainer' })
        .then(trainers => {
            return trainers;
        })
        .catch(next);
    const trainees = await Users.find({ role: 'trainee' })
        .then(trainees => {
            return trainees;
        })
        .catch(next);
    const categories = await Categories.find({})
        .then(categories => {
            return categories
        })
        .catch(next);
    await Courses.findOne({ _id: req.params.id })
        .then(course => {
            res.render('staff/courses/detailCourse', {
                trainers,
                trainees,
                course,
                categories
            })
        })
}
//[POST] /staff/viewCourse/:id/addTrainee
const addTrainee = async (req, res, next) => {
    await Courses.updateOne({ _id: req.params.id },{ $push: {idTrainee : req.body.traineeIds}})
    res.redirect(`/staff/viewCourses/${req.params.id}`);     
}
//[GET] /staff/viewCourse/:id/viewAddTrainee
const viewAddTrainee = async (req, res, next) => {
    const trainees = await Users.find({ role: 'trainee' })
        .then(trainees => {
            return trainees;
        })
        .catch(next);
    await Courses.findOne({ "_id": req.params.id })
        .then(course => {
            res.render('staff/courses/addTrainee', {
                trainees,
                course
            })
        })
        .catch(next);
}
//[DELETE] /staff/viewCourse/:id/deleteTrainee
const deleteTrainee = async (req, res, next) => {
    await Courses.updateOne({ _id: req.params.id },{ $pull: {idTrainee:  req.params.idTrainee} })
        .then(() => {
            res.redirect('back')
        })
}
//[GET] /staff/viewCourse/:id/viewAddTrainer
const viewAddTrainer = async (req, res, next) => {
    const trainers = await Users.find({ role: 'trainer' })
        .then(trainers => {
            return trainers;
        })
        .catch(next);
    await Courses.findOne({ "_id": req.params.id })
        .then(course => {
            res.render('staff/courses/addTrainer', {
                trainers,
                course
            })
        })
        .catch(next);
}
//[POST] /staff/viewCourse/:id/addTrainer
const addTrainer = async (req, res, next) => {
    await Courses.updateOne({ _id: req.params.id },{ idTrainer : req.body.trainerId})
    res.redirect(`/staff/viewCourses/${req.params.id}`);     
}
//[DELETE] /staff/viewCourse/:id/deleteTrainer
const deleteTrainer = async (req, res, next) => {
    await Courses.updateOne({ _id: req.params.id },{ idTrainer:  '' })
        .then(() => {
            res.redirect('back')
        })
}

const course = {
    show,
    create,
    store,
    edit,
    update,
    search,
    destroy,
    storeTrash,
    restore,
    deleteForce,
    showDetail,
    addTrainee,
    viewAddTrainee,
    addTrainer,
    viewAddTrainer,
    deleteTrainee,
    deleteTrainer
}
module.exports = course;