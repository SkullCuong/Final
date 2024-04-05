const express = require('express');
const router = express.Router();
const uploadImage = require('../middleware/uploadImage');
const roomController = require('../controllers/Room');

router.get('/', roomController.index);
router.get('/create', roomController.createRender);
router.post('/create', uploadImage, roomController.create);
router.get('/update/:id', roomController.updateRender);
router.post('/update/:id', uploadImage, roomController.update);
router.get('/delete/:id', roomController.delete);
module.exports = router;