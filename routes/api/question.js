const express = require("express");
const passport = require("passport");
const router = express.Router();
const questionApi = require("../../controller/api/question_api_controller");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  questionApi.create
);
router.get("/:id", questionApi.getAllOptions);
router.use(
  "/:id/options/create",
  passport.authenticate("jwt", { session: false }),
  questionApi.createOptions
);
router.delete(
  "/:id/delete",
  passport.authenticate("jwt", { session: false }),
  questionApi.deleteQuestion
);

module.exports = router;
