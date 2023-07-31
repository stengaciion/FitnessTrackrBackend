const requireUser = (req, res, next) => {
  if (!req.user) {
    next({
        error: "Not logged in",
        name: "MissingUserError",
        message: "You must be logged in to perform this action",
    });
  }
  
  next();
};

module.exports = { requireUser };
