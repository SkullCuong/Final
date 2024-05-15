const express = require('express');
const router = express.Router();
const userController = require('../controllers/User');
const account = require('../middleware/account');
const uploadImage = require('../middleware/uploadImage');
const { route } = require('./RoomRoute');
// router.get('/', roomController.index);
router.get('/register', userController.signUpRender);
router.post('/register', userController.signUp);

// // Forget Password
router.get('/recovery', userController.forgetRender);
router.post('/recovery', userController.forget);
router.get('/change', userController.changePassRender);
router.post('/change', userController.changePass);

router.get('/confirm', userController.confirm);
router.get('/login', userController.signInRender);
router.post('/login', userController.signIn);
router.get('/logout', userController.signOut);
router.get('/profile', account.verifyToken, userController.profileRender);
router.post('/profile', account.verifyToken, userController.profileUpdate);

router.get('/', userController.index);

// // Password Change
router.get('/password', account.verifyToken, userController.passRender);
router.post('/password', account.verifyToken, userController.passChange);

// // Change Imagpe
router.get('/image', account.verifyToken, userController.uploadImageRender);
router.post(
  '/image',
  account.verifyToken,
  uploadImage,
  userController.uploadImage
);

router.get('/status/:id', account.verifyToken, userController.renderStatus);
router.post('/status/:id', account.verifyToken, userController.status);

router.post('/isvalid', userController.isValid);
router.post('/checkexist', userController.checkExist);

module.exports = router;
