const router = require("express").Router();

const {
  getPosts,
  getPostDetails,
  createPost,
  editPost,
  deletePost,
} = require("./../controllers/posts");

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPostDetails);
router.patch("/:id", editPost);
router.delete("/:id", deletePost);

module.exports = router;
