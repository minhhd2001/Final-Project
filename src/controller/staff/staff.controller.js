const category = require('./category.controller')
const course = require('./course.controller')

//[GET] /staff
const index = (req, res, next) => {
    // console.log(req.email)
    res.render('staff/index',{
        role: 'Staff',
        link: '/staff', 
        avatar: req.avatar, 
        email: req.email
    });
}




const staff = {
    index,
    category,
    course,
}
module.exports = staff;