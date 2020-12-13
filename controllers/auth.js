const { User } = require("./../models/userModal");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");

const getUsers = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: "working....",
  });
});

const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  if (!name || !email || !password || !passwordConfirm)
    return res.status(400).json({
      status: "fail",
      data: "please provide a valid information!",
    });

  const exsistUser = await User.findOne({ email });
  // console.log(exsistUser);

  if (exsistUser)
    return res.status(400).json({
      status: "fail",
      data: "please provide a dieffernt email!",
    });

  const newUser = new User({
    name,
    email,
    password,
    passwordConfirm,
  });

  await newUser.save();

  const token = jwt.sign(
    { id: newUser._id, name: newUser.name },
    process.env.token_secret,
    {
      expiresIn: process.env.token_date,
    }
  );

  res.status(201).json({
    status: "success",
    data: newUser,
    token,
  });
});

module.exports.signup = signup;
module.exports.getUsers = getUsers;
