const catchAsync = require("./../utils/catchAsync");
const { User } = require("./../models/userModal");
const { uploadFromBuffer, deleteImage } = require("./../utils/imageHandle");

const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ isActive: true });
  res.status(200).json({
    status: "success",
    data: users,
  });
});

const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id, isActive: true });

  if (!user)
    return res.status(404).json({
      status: "fail",
      message: "can not find a user with this id, please try with another id!",
    });

  res.status(200).json({
    status: "success",
    data: user,
  });
});

const updateMe = catchAsync(async (req, res, next) => {
  // Steps for implementing a update me route
  // 01-Checking if the user send his/her password and if so , return with an error
  // 02-Getting the email and the name from the body and validate them
  // 03-Find the correct user and update the needed information
  // 04-Send back a json response to notify the client

  const userId = req.user._id;
  const user = await User.findById(userId);

  if (req.body.password || req.body.passwordConfirm)
    return res.status(400).json({
      status: "fail",
      message: "Do not provide your password here, try different route!",
    });

  let result = {
    secure_url: null,
    public_id: null,
  };

  let userPhoto;
  if (!req.file) {
    result = {
      public_id: user.photo.public_id,
      secure_url: user.photo.url,
    };
  }

  if (req.file) {
    if (user.photo.public_id !== "" && user.photo.secure_url !== "") {
      await deleteImage(user.photo.public_id);
    }

    userPhoto = req.file.processedImage;
    result = await uploadFromBuffer(userPhoto.data);
  }

  let { email, name } = req.body;
  if (!email || !name) {
    email = req.user.email;
    name = req.user.name;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: name,
      email: email,
      photo: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    },
    { new: true, runValidators: true }
  );

  return res.status(200).json({
    status: "success",
    message: updatedUser,
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
module.exports.getUser = getUser;
