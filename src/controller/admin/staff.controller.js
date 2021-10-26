var Staff = require('../../model/users.model').model;

const show = async(req, res, next) => {
    const staff = await Staff.find({ role: 'staff' });
    return res.render('admin/staff/viewStaff', {
        staff,
        rolePage: req.rolePage,
        link: `/${req.role}`,
        avatar: req.avatar,
        email: req.email
    });
}
const getCreate = async(req, res) => {
    return res.render('admin/staff/createStaff', {
        rolePage: req.rolePage,
        link: `/${req.role}`,
        avatar: req.avatar,
        email: req.email
    });
}

const create = async(req, res) => {
    try {
        const staffExist = await Staff.findOne({ email: req.body.email });
        if (staffExist) {
            return res.status(409).message('Email must be unique');
        }
        const staff = new Staff({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            phone: req.body.phone,
            address: req.body.address,
            role: "staff",
        });
        await staff.save();
        res.redirect('/admin/viewStaff');
    } catch (error) {
        res.send(error)
    }

}

const edit = (req, res, next) => {
    Staff.findOne({ _id: req.params.id })
        .then(staff => {
            console.log(staff);
            res.render('admin/staff/editStaff', {
                staff: staff,
                rolePage: req.rolePage,
                link: `/${req.role}`,
                avatar: req.avatar,
                email: req.email
            })
        })
        .catch(next)
}

const update = (req, res, next) => {
    Staff.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect('/admin/viewStaff'))
        .catch(next)
}

const deleteS = async(req, res, next) => {
    Staff.deleteOne({ _id: req.params.id })
        .then(() => {
            res.redirect('/admin/viewStaff')
        })
        .catch(next)
}

const staff = {
    show,
    create,
    getCreate,
    edit,
    update,
    deleteS
}

module.exports = staff