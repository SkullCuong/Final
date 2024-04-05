const express = require('express');
const router = express.Router();
const roleController = require('../controllers/Role');

router.get('/', roleController.index);
router.get('/create', roleController.createRender);
router.post('/create', roleController.create);
router.get('/update/:id', roleController.updateRender);
router.post('/update/:id', roleController.update);
// router.get('/delete/:id', roomController.delete);
module.exports = router;
