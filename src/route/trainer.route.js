const express = require('express');
const router = express.Router();
const multer = require('multer');
const uniqid = require('uniqid');
// const upload = multer({ dest: './public/images/' })
// const { upload } = require('../middleware/user.middleware');
const trainer = require('../controller/trainer.controller');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/');
    },
    filename: (req, file, cb) => {
        const uniqueImage = uniqid('Image-',`-${file.originalname}`);
        cb(null, file.originalname);
    }
})

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../../public/images')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, uniqueSuffix + '-' + file.originalname)
//     }
//   })
  
//   var upload = multer({ storage: storage })

const upload = multer({ storage: storage, });
const test = function (req, res, next) {
    console.log(upload)
    next()
}

router.post('/updateprofile',test, upload.single('avatar') , trainer.update);


module.exports = router;