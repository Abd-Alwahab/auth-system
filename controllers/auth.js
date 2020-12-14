const { User } = require("./../models/userModal");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const sendToken = (user) => {
  const token = jwt.sign({ id: user._id, name: user.name }, process.env.token_secret, {
    expiresIn: process.env.token_date,
  });

  return token;
};

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

  const token = sendToken(newUser);

  res.status(201).json({
    status: "success",
    data: newUser,
    token,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      status: "fail",
      message: "please provide a valid information!",
    });

  const noUser = await User.findOne({ email });

  if (!noUser)
    return res.status(404).json({
      status: "fail",
      message: " can not find a user with email, please try agian!",
    });

  const validPassword = await bcrypt.compare(password, noUser.password);

  if (!validPassword)
    return res.status(400).json({
      status: "fail",
      message: "wrong email or password, please try agian!",
    });

  const token = sendToken(noUser);

  res.status(201).json({
    status: "success",
    data: noUser,
    token,
  });
});

const protect = catchAsync(async (req, res, next) => {
  //01-Getting the token and cheking if its there!
  let token;
  if (req.headers.token) {
    token = req.headers.token;
  }

  if (!token)
    return res.status(400).json({
      status: "fail",
      message: "please provide a token!",
    });
});
module.exports.signup = signup;
module.exports.login = login;
module.exports.getUsers = getUsers;
