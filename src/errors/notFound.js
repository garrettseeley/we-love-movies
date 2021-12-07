module.exports = function notFound(req, res, next) {
  next({status: 404, message: `Not found: ${req.originalUrl}`});
};