'use strict';
const express = require('express');
const router = express.Router();
const roomRoute = require('../routes/RoomRoute');
const roleRoute = require('../routes/RoleRoute');
const userRoute = require('../routes/UserRoute');
const bookingRoute = require('../routes/BookingRoute');
const homeRoute = require('../routes/HomeRoute');
const accountVerify = require('../middleware/account.js');

// // Middleware

router.use('/room', accountVerify.verifyToken, roomRoute);
router.use(
  '/role',
  accountVerify.verifyToken,
  accountVerify.isAdmin,
  roleRoute
);
router.use('/user', userRoute);
router.use('/booking', bookingRoute);
router.use('/home', homeRoute);

module.exports = router;
