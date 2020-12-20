const catchAsync = require("./../utils/catchAsync");
const { User } = require("./../models/userModal");

const updateMe = catchAsync(async (req, res, next) => {
  console.log("Update...");
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

module.exports.updateMe = updateMe;
