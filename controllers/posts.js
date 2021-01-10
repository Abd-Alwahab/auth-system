const catchAsync = require("./../utils/catchAsync");
const { Post } = require("./../models/postModal");

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
  console.log("Create Post Handler");
});

const editPost = catchAsync(async (req, res, next) => {
  console.log("Edit Post Handler");
});

const deletePost = catchAsync(async (req, res, next) => {
  console.log("Delete Post Handler");
});

module.exports.getPosts = getPosts;
module.exports.getPostDetails = getPostDetails;
module.exports.createPost = createPost;
module.exports.editPost = editPost;
module.exports.deletePost = deletePost;
