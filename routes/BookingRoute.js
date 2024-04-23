const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/Booking');
const account = require('../middleware/account');
router.get('/book/:id', account.verifyToken, bookingController.bookRender);
router.post('/book', account.verifyToken, bookingController.book);

router.get('/checkin/:id', bookingController.checkInRender);
router.post('/checkin/:id', bookingController.checkIn);

router.get('/index', bookingController.indexAdmin);

module.exports = router;
