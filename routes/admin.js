const adminController = require('../controllers/admin');
const express = require('express');
const router = express.Router();

router.get('/', adminController);

module.exports = router;
