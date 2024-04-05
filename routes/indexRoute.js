'use strict';
const express = require('express');
const router = express.Router();
const roomRoute = require('../routes/RoomRoute');
const roleRoute = require('../routes/RoleRoute');
router.use('/room', roomRoute);
router.use('/role', roleRoute);
module.exports = router;
