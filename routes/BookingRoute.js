const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/Booking');
const account = require('../middleware/account');
router.get('/book', account.verifyToken, bookingController.bookRender);
router.post('/book', account.verifyToken, bookingController.book);
module.exports = router;
