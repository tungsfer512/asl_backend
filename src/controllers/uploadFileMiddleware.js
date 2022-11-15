const util = require('util');
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, Date.now() + '_' + file.originalname);
    }
});

let uploadFile = multer({
    storage: storage
}).single('file');

let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
