const category = require('./category.controller')
const course = require('./course.controller')

//[GET] /staff
const index = (req, res, next) => {
    res.render('staff/index');
}




const staff = {
    index,
    category,
    course,
}
module.exports = staff;