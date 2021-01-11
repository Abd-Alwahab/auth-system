const router = require("express").Router();

const { resizePostPhoto, upload } = require("./../utils/imageHandle");

const {
  getPosts,
  getPostDetails,
  createPost,
  editPost,
  deletePost,
} = require("./../controllers/posts");

router.get("/", getPosts);
router.post("/", [upload.single("photo"), resizePostPhoto], createPost);
router.get("/:id", getPostDetails);
router.patch("/:id", editPost);
router.delete("/:id", deletePost);

module.exports = router;
