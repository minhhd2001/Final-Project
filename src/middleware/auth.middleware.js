const jwt = require('jsonwebtoken');

const tokenSecret = 'group5';

const verifyToken = function (req, res, next){
    const token = req.headers.authorization;
    if(!token) return res.send(401);
    jwt.verify(token, tokenSecret, function (err, decode) {
        if(err) return res.send(err);
        req.role = decode.role;
        req.id = decode.id;
        next();
    })
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
    verifyToken,
    isAdmin,
    isStaff,
    isTrainer,
    isTrainee,
}

module.exports = authenticate;
