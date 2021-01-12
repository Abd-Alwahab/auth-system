const router = require("express").Router();

const { resizePostPhoto, upload } = require("./../utils/imageHandle");

const { protect, restricPermissions } = require("./../controllers/auth");

const {
  getPosts,
  getPostDetails,
  createPost,
  editPost,
  deletePost,
} = require("./../controllers/posts");

router.get("/", getPosts);
router.post(
  "/",
  protect,
  restricPermissions("admin"),
  [upload.single("photo"), resizePostPhoto],
  createPost
);
router.get("/:id", getPostDetails);
router.patch(
  "/:id",
  protect,
  restricPermissions("admin"),
  [upload.single("photo"), resizePostPhoto],
  editPost
);
router.delete("/:id", protect, restricPermissions("admin"), deletePost);

module.exports = router;
