'use strict';
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'views/images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

async function uploadImage(req, res, next) {
  upload.single('image')(req, res, async err => {
    if (err) {
      console.log(err);
    }
    console.log(req.file.filename);
    next();
  });
}
module.exports = uploadImage;
