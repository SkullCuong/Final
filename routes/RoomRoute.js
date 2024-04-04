const express = require("express");
const router = express.Router();

const roomController = require("../controllers/Room");
router.get("/", roomController.index);
router.get("/create", roomController.createRender);
router.post("/create", roomController.create);
router.get("/update/:id", roomController.updateRender);
router.post("/update/:id", roomController.update);
router.get("/delete/:id", roomController.delete);
module.exports = router;
