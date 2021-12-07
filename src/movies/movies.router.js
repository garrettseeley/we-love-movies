const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./movies.controller");

router
  .route("/:movieId/reviews")
  .get(controller.listReviews)
  .all(methodNotAllowed);
router
  .route("/:movieId/theaters")
  .get(controller.listTheaters)
  .all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router; 
