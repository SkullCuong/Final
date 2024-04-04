"use strict";
const express = require("express");
const router = express.Router();
const roomRoute = require("../routes/RoomRoute");

router.use("/room", roomRoute);

module.exports = router;
