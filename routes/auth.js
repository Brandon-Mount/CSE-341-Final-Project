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
          message: "Authenticated with GitHub, but session login failed.",
          error: loginError.message,
        });
      }

      return res.redirect("/auth/success");
    });
  })(req, res, next);
});
