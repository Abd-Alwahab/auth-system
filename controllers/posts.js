const catchAsync = require("./../utils/catchAsync");
const { Post } = require("./../models/postModal");

const getPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    status: "success",
    data: posts,
  });
  console.log("Get All Posts Handler");
});

const getPostDetails = catchAsync(async (req, res, next) => {
  console.log("Get All Posts Handler");
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
