const Trainer = require('../../model/users.model').model;

const show = async(req, res, next) => {
    const trainer = await Trainer.find({ role: 'trainer' });

    return res.render('admin/trainer/viewTrainer', {
        trainer,
        rolePage: req.rolePage,
        link: `/${req.role}`,
        avatar: req.avatar,
        email: req.email
    });
}
const getCreate = async(req, res) => {
    return res.render('admin/trainer/createTrainer', {
        rolePage: req.rolePage,
        link: `/${req.role}`,
        avatar: req.avatar,
        email: req.email
    });
}


const create = async(req, res) => {
    try {
        const trainerExist = await Trainer.findOne({ email: req.body.email });
        if (trainerExist) {
            return res.status(409).message('Email must be unique');
        }
        const trainer = new Trainer({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            phone: req.body.phone,
            address: req.body.address,
            role: "trainer",
        });
        await trainer.save();
        res.redirect('/admin/viewTrainer');
    } catch (error) {
        res.send(error)
    }

}

const edit = (req, res, next) => {
    Trainer.findOne({ _id: req.params.id })
        .then(trainer => {
            console.log(trainer);
            res.render('admin/trainer/editTrainer', {
                trainer: trainer,
                rolePage: req.rolePage,
                link: `/${req.role}`,
                avatar: req.avatar,
                email: req.email
            })
        })
        .catch(next)
}


const update = (req, res, next) => {
    Trainer.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect('/admin/viewTrainer'))
        .catch(next)
}



const deleteS = async(req, res, next) => {
    Trainer.deleteOne({ _id: req.params.id })
        .then(() => {
            res.redirect('/admin/viewTrainer')
        })
        .catch(next)
}

const trainer = {
    show,
    create,
    getCreate,
    edit,
    update,
    deleteS
}

module.exports = trainer