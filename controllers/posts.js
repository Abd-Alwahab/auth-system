const catchAsync = require("./../utils/catchAsync");
const { Post } = require("./../models/postModal");
const { uploadFromBuffer } = require("../utils/imageHandle");

const getPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    status: "success",
    data: posts,
  });
});

const getPostDetails = catchAsync(async (req, res, next) => {
  const post = await Post.find({ _id: req.params.id });

  if (!post)
    res.status(404).json({
      status: "fail",
      data: "can not find post with this id",
    });

  res.status(200).json({
    status: "success",
    data: posts,
  });
});

const createPost = catchAsync(async (req, res, next) => {
  const { title, description } = req.body;

  if (!title || !req.file)
    res.status(400).json({
      status: "fail",
      data: "please providea post title! and a post photo",
    });

  let postPhoto = {
    secure_url: null,
    public_id: null,
  };

  let result;

  if (req.file) {
    postPhoto = req.file.processedImage;
    result = await uploadFromBuffer(postPhoto.data);
  }

  const post = new Post({
    title,
    description,
    phot: {
      public_id: result.public_id,
      secure_url: result.secure_url,
    },
  });

  res.status(200).json({
    status: "success",
    data: post,
  });
});

const editPost = catchAsync(async (req, res, next) => {
  console.log("Edit Post Handler");
});

const deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndRemove(req.params.id);

  if (!post)
    res.status(404).json({
      status: "fail",
      data: "post is already deleted",
    });

  res.status(200).json({
    status: "success",
    data: null,
  });
});

module.exports.getPosts = getPosts;
module.exports.getPostDetails = getPostDetails;
module.exports.createPost = createPost;
module.exports.editPost = editPost;
module.exports.deletePost = deletePost;
