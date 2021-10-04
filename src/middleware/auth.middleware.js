const verifyUser = (req, res, next)=>{
    const user = req.session.user;
    if(!user) return res.send(401);
    req.id = user.id;
    req.role = user.role;
    req.name = user.name;
    req.avatar = user.avatar;
    next();
}

const checkLogout = (req, res, next) => {
    const user = req.session.user;
    if(!user) next();
    else{
        switch(user.role){
            case 'admin':
                res.redirect('/profile')
            break;
            case 'staff':
                res.redirect('/staff');
            break;
            case 'trainer':
                res.redirect('/profile')
            break;
            default :
                res.redirect('/profile')
            break;
        }
    }
}

const isAdmin = (req, res, next) => {
    const role = req.role;
    if(role === 'admin') {
        next();
    } else return res.send(401);
}

const isStaff = (req, res, next) => {
    const role = req.role;
    if(role === 'staff') {
        next();
    } else return res.send(401);
}

const isTrainer = (req, res, next) => {
    const role = req.role;
    if(role === 'trainer') {
        next();
    } else return res.send(401);
}

const isTrainee = (req, res, next) => {
    const role = req.role;
    if(role === 'trainee') {
        next();
    } else return res.send(401);
}

const authenticate = {
    verifyUser,
    checkLogout,
    isAdmin,
    isStaff,
    isTrainer,
    isTrainee,
}

module.exports = authenticate;
