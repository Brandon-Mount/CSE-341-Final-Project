const router = require("express").Router();
const gamesController = require("../controllers/games.js");

router.get("/", gamesController.getAll);
router.get("/:id", gamesController.getSingle);
router.post("/", gamesController.createGame);
router.put("/:id", gamesController.updateGame);
router.delete("/:id", gamesController.deleteGame);

module.exports = router;
