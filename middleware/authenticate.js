const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    message: "Authentication is required. Please log in with GitHub.",
  });
};

module.exports = {
  isAuthenticated,
};
