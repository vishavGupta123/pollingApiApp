const Question = require("../../model/question");
const Option = require("../../model/option");

//creating controller to delete an option
module.exports.deleteOption = async function (req, res) {
  try {
    let option = await Option.findById(req.params.id);
    if (option) {
      let questionId = option.question;
      if (option.vote > 0) {
        return res.json(403, {
          message: "Cannot delete an upvoted option",
        });
      }
      //if some another user is trying to delete the option which he/she has not created then they will recieve an unauthorized error
      if (req.user.id != option.user) {
        return res.json(401, {
          message: "you cannot delete this option as you are not authourized",
        });
      }
      option.remove();

      let question = Question.findByIdAndUpdate(questionId, {
        $pull: { options: req.params.id },
      });

      return res.json(200, {
        message: "option deleted successfully",
      });
    }
  } catch (err) {
    return res.json(500, {
      message: "Internal server error",
    });
  }
};

//creating controller to add vote everytime someone visits /add_vote link
module.exports.addVote = async function (req, res) {
  try {
    let option = await Option.findById(req.params.id);
    console.log(option.vote);

    if (option) {
      option.vote += 1;
      option.save();
      return res.json(200, {
        message: "Upvoted a question ",
        option: option,
      });
    }
  } catch (err) {
    return res.json(500, {
      message: "Internal server error ",
    });
  }
};
