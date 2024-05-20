const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

router.get('/err', homeController.err);

// router.get('/delete/:id', roomController.delete);
module.exports = router;
