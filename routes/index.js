const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Game Library API",
  });
});

router.use("/", require("./swagger.js"));
router.use("/games", require("./games.js"));
router.use("/developers", require("./developers.js"));
router.use("/consoles", require("./consoles.js"));
router.use("/users", require("./users.js"));
router.use("/auth", require("./auth.js"));

module.exports = router;
