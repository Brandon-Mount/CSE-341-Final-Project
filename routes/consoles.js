const router = require("express").Router();
const consolesController = require("../controllers/consoles.js");

router.get("/", consolesController.getAll);
router.get("/:id", consolesController.getSingle);
router.post("/", consolesController.createConsole);
router.put("/:id", consolesController.updateConsole);
router.delete("/:id", consolesController.deleteConsole);

module.exports = router;
