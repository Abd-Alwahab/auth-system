const catchAsync = require("./../utils/catchAsync");
const { User } = require("./../models/userModal");

const updateMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user)
    return res.status(404).json({
      status: "fail",
      message: "can not find a user with this id, please try to login! ",
    });
});

module.exports.updateMe = updateMe;
