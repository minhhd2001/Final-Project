const jwt = require('jsonwebtoken');

const tokenSecret = process.env.TOKEN_SECRET_KEY || '';

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

const idAdmin = (req, res, next) => {
    const role = req.role;
    if(role === 'admin') {
        next();
    } else return res.send(401);
}

const idStaff = (req, res, next) => {
    const role = req.role;
    if(role === 'staff') {
        next();
    } else return res.send(401);
}

const idTrainer = (req, res, next) => {
    const role = req.role;
    if(role === 'trainer') {
        next();
    } else return res.send(401);
}

const idTrainee = (req, res, next) => {
    const role = req.role;
    if(role === 'trainee') {
        next();
    } else return res.send(401);
}

const authenticate = {
    verifyToken,
    idAdmin,
    idStaff,
    idTrainer,
    idTrainee,
}

module.exports = authenticate;
