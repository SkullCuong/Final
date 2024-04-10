const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

router.get('/about', homeController.about);
router.get('/contact', homeController.contact);

// router.get('/delete/:id', roomController.delete);
module.exports = router;
