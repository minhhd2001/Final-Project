const users = require('../model/users.model');
const User = users.model;
const Course = require('../model/courses.model');

const update = async (req, res, next) => {
    const avatar = req.file;
    console.log(avatar);
    await User.updateOne({$and:[{_id: req.id},{role: 'trainer'}]},{
        avatar: avatar,
        phone : req.body.phone,
        address: req.body.address,
        age: req.body.age,
        name: req.body.name,
    }).then()
        .catch((err) => {
            res.send(err);
        })
    res.redirect('/profile');
}

const trainer = {
    update
}

module.exports = trainer;
