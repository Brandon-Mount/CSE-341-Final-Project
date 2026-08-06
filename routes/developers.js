const router = require("express").Router();
const developersController = require("../controllers/developers.js");
const { isAuthenticated } = require("../middleware/authenticate.js");

router.get("/", developersController.getAll);
router.get("/:id", developersController.getSingle);

router.post("/", isAuthenticated, developersController.createDeveloper);

router.put("/:id", isAuthenticated, developersController.updateDeveloper);

router.delete("/:id", developersController.deleteDeveloper);

module.exports = router;
