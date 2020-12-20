const catchAsync = require("./../utils/catchAsync");
const { User } = require("./../models/userModal");

const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ isActive: true });
  res.status(200).json({
    status: "success",
    data: users,
  });
});

const updateMe = catchAsync(async (req, res, next) => {
  // Steps for implementing a update me route
  // 01-Checking if the user send his/her password and if so , return with an error
  // 02-Getting the email and the name from the body and validate them
  // 03-Find the correct user and update the needed information
  // 04-Send back a json response to notify the client

  if (req.body.password || req.body.passwordConfirm)
    return res.status(400).json({
      status: "fail",
      message: "Do not provide your password here, try different route!",
    });

  const { email, name } = req.body;
  if (!email && !name)
    return res.status(400).json({
      status: "fail",
      message: "please provide an email or a name!",
    });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    { new: true, runValidators: true }
  );

  return res.status(200).json({
    status: "success",
    message: user,
  });
});

const deleteMe = catchAsync(async (req, res, next) => {
  // Steps for implementing Deactivate a user account
  // 01-Getting the currently logged IN user
  // 02-Chekcing is his/her account is already deleted
  // 03-Deactivate his/her account id everything is passed
  // 04-Sending a json response to notify the client
  const user = await User.findById(req.user._id);

  if (!user.isActive)
    return res.status(400).json({
      status: "fail",
      message: "user is already deleted, please try to contact us!",
    });

  user.isActive = false;

  res.status(200).json({
    status: "success",
    message: "your account was deleted, see you next ",
  });
});

module.exports.updateMe = updateMe;
module.exports.deleteMe = deleteMe;
module.exports.getUsers = getUsers;
