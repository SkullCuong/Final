const express = require('express');
const router = express.Router();
const uploadImage = require('../middleware/uploadImage');
const roomController = require('../controllers/Room');
const accountVerify = require('../middleware/account.js');

router.get('/', accountVerify.verifyToken, roomController.room);
router.get(
  '/roomindex',
  accountVerify.verifyToken,
  accountVerify.isAdmin,
  roomController.index
);
router.get(
  '/detail/:id',
  accountVerify.verifyToken,
  accountVerify.isAdmin,
  roomController.detail
);
router.get(
  '/roomDetail/:id',
  accountVerify.verifyToken,
  accountVerify.isAdmin,
  roomController.roomdetail
);
router.get(
  '/adminroomDetail/:id',
  accountVerify.verifyToken,
  accountVerify.isAdmin,
  roomController.adminroomdetail
);
router.get(
  '/create',
  accountVerify.verifyToken,
  accountVerify.isAdmin,
  roomController.createRender
);
router.post(
  '/create',
  accountVerify.verifyToken,
  accountVerify.isAdmin,
  uploadImage,
  roomController.create
);
router.get(
  '/update/:id',
  accountVerify.verifyToken,
  accountVerify.isAdmin,
  roomController.updateRender
);
router.post(
  '/update/:id',
  accountVerify.verifyToken,
  accountVerify.isAdmin,
  uploadImage,
  roomController.update
);
router.get(
  '/delete/:id',
  accountVerify.verifyToken,
  accountVerify.isAdmin,
  roomController.delete
);

// API

router.post('/checkexist', roomController.checkExist);
module.exports = router;
