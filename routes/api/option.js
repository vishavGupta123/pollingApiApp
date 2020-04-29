const express = require("express");
const passport = require("passport");
const router = express.Router();
const optionApi = require("../../controller/api/options_api_controller");

router.delete(
  "/:id/delete",
  passport.authenticate("jwt", { session: false }),
  optionApi.deleteOption
);
router.post("/:id/add_vote", optionApi.addVote);

module.exports = router;
