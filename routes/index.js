const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Game Library API",
    authenticated: req.isAuthenticated(),
  });
});

router.use("/", require("./swagger.js"));
router.use("/auth", require("./auth.js"));
router.use("/games", require("./games.js"));
router.use("/developers", require("./developers.js"));
router.use("/consoles", require("./consoles.js"));
router.use("/users", require("./users.js"));

module.exports = router;
