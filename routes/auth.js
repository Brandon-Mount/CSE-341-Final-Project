const router = require("express").Router();
const passport = require("passport");

// Start GitHub OAuth login.
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  }),
);

// GitHub redirects here after login.
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/auth/failure",
  }),
  (req, res) => {
    res.redirect("/auth/success");
  },
);

// Successful login.
router.get("/success", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: "You are not logged in.",
    });
  }

  return res.status(200).json({
    message: "Login successful.",
    user: req.user,
  });
});

// Failed login.
router.get("/failure", (req, res) => {
  return res.status(401).json({
    message: "GitHub login failed.",
  });
});

// Check login status.
router.get("/status", (req, res) => {
  return res.status(200).json({
    authenticated: req.isAuthenticated(),
    user: req.user || null,
  });
});

// Log out.
router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy((sessionError) => {
      if (sessionError) {
        return res.status(500).json({
          message: "Logout failed.",
        });
      }

      res.clearCookie("connect.sid");

      return res.status(200).json({
        message: "Logout successful.",
      });
    });
  });
});

module.exports = router;
