const router = require("express").Router();
const gamesController = require("../controllers/games.js");
const { isAuthenticated } = require("../middleware/authenticate.js");

router.get("/", gamesController.getAll);
router.get("/:id", gamesController.getSingle);

router.post("/", isAuthenticated, gamesController.createGame);
router.put("/:id", isAuthenticated, gamesController.updateGame);

router.delete("/:id", gamesController.deleteGame);

module.exports = router;
