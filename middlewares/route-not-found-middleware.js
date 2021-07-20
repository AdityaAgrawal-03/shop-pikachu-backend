const routeNotFound = (req, res, next) => {
  res.status(500).json({ success: false, message: "route not found!" });
};

module.exports = { routeNotFound };
