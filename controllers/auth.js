const { User } = require("./../models/userModal");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

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

  const token = jwt.sign(
    { id: noUser._id, name: noUser.name },
    process.env.token_secret,
    {
      expiresIn: process.env.token_date,
    }
  );

  res.status(201).json({
    status: "success",
    data: noUser,
    token,
  });
});
module.exports.signup = signup;
module.exports.login = login;
module.exports.getUsers = getUsers;
