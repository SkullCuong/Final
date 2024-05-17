const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/Booking');
const account = require('../middleware/account');
router.get('/book/:id', account.verifyToken, bookingController.bookRender);
router.post('/book/:id', account.verifyToken, bookingController.book);

router.get('/checkin/:id', bookingController.checkInRender);
router.post('/checkin/:id', bookingController.checkIn);

// // Change Status
router.get('/status/:id', bookingController.changeStatusRender);
router.post('/status/:id', bookingController.changeStatus);

router.get('/index', bookingController.indexAdmin);

router.get('/detail/:id', bookingController.detailAdminRender);

// // API To Check Date
router.post('/checkdate', bookingController.checkDate);

// // Manage Order

router.get('/order/:id', bookingController.orderRender);
router.get('/orderdetail/:id', bookingController.orderdetailRender);
module.exports = router;
