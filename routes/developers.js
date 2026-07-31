const router = require("express").Router();
const developersController = require("../controllers/developers.js");

router.get("/", developersController.getAll);
router.get("/:id", developersController.getSingle);
router.post("/", developersController.createDeveloper);
router.put("/:id", developersController.updateDeveloper);
router.delete("/:id", developersController.deleteDeveloper);

module.exports = router;
