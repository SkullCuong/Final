const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/Booking');
const account = require('../middleware/account');
router.get('/book/:id', account.verifyToken, bookingController.bookRender);
router.post('/book/:id', account.verifyToken, bookingController.book);

router.get('/checkin/:id', bookingController.checkInRender);
router.post('/checkin/:id', bookingController.checkIn);

// // Change Status
router.get(
  '/status/:id',
  account.verifyToken,
  account.isAdmin,
  bookingController.changeStatusRender
);
router.post(
  '/status/:id',
  account.verifyToken,
  account.isAdmin,
  bookingController.changeStatus
);

router.get(
  '/index',
  account.verifyToken,
  account.isAdmin,
  bookingController.indexAdmin
);

router.get(
  '/detail/:id',
  account.verifyToken,
  account.isAdmin,
  bookingController.detailAdminRender
);

// // API To Check Date
router.post('/checkdate', bookingController.checkDate);

// // Manage Order

router.get('/order/:id', account.verifyToken, bookingController.orderRender);
router.get(
  '/orderdetail/:id',
  account.verifyToken,
  bookingController.orderdetailRender
);

// // Booking Cancel
router.post('/cancel', account.verifyToken, bookingController.userCancel);
module.exports = router;
