const User = require("../../model/user");
const jwt = require("jsonwebtoken");
module.exports.signUp = async function (req, res) {
  let user = await User.findOne({ username: req.body.username });
  if (user) {
    return res.json(403, {
      message: "User with this name already exist",
    });
  }
  if (!user) {
    let newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    if (newUser) {
      return res.json(200, {
        message: "Successfully created a new user",
      });
    }
  }
};

module.exports.createSession = async function (req, res) {
  try {
    console.log(req.body);
    let user = await User.findOne({ username: req.body.username });
    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }
    return res.json(200, {
      message: "Sign in successfull, here is your token",
      data: {
        token: jwt.sign((await user).toJSON(), "question", {
          expiresIn: "100000",
        }),
      },
    });
  } catch (err) {
    console.log("***", err, "***");
    return res.json(500, {
      message: "Internal server error",
    });
  }
};
