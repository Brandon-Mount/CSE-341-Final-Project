const router = require("express").Router();
const passport = require("passport");

// Start GitHub OAuth login
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  }),
);

// GitHub OAuth callback with detailed error handling
router.get("/github/callback", (req, res, next) => {
  passport.authenticate("github", (error, user, info) => {
    if (error) {
      console.error("GitHub OAuth callback error:", error);

      return res.status(500).json({
        message: "GitHub OAuth callback failed.",
        error: error.message,
      });
    }

    if (!user) {
      console.error("GitHub OAuth returned no user:", info);

      return res.status(401).json({
        message: "GitHub authentication failed.",
        details: info || null,
      });
    }

    req.logIn(user, (loginError) => {
      if (loginError) {
        console.error("Session login error:", loginError);

        return res.status(500).json({
          message: "GitHub login succeeded, but the session login failed.",
          error: loginError.message,
        });
      }

      return res.redirect("/auth/success");
    });
  })(req, res, next);
});

// Successful login
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

// Failed login
router.get("/failure", (req, res) => {
  return res.status(401).json({
    message: "GitHub login failed.",
  });
});

// Check login status
router.get("/status", (req, res) => {
  return res.status(200).json({
    authenticated: req.isAuthenticated(),
    user: req.user || null,
  });
});

// Log out
router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy((sessionError) => {
      if (sessionError) {
        return res.status(500).json({
          message: "Logout failed.",
          error: sessionError.message,
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
