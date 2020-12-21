const router = require("express").Router();
const {
  signup,

  login,
  protect,
  restricPermissions,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("./../controllers/auth");
const { upload, resizeUserPhoto } = require("./../utils/imageHandle");

const { updateMe, getUsers, deleteMe } = require("./../controllers/users");

router.post("/signup", signup);
router.post("/login", login);
router.patch("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);
router.get("/", protect, restricPermissions("admin"), getUsers);

router.patch("/updateMyPassword", protect, updatePassword);
router.patch("/me", [protect, upload.single("photo"), resizeUserPhoto], updateMe);
router.delete("/me", protect, deleteMe);

module.exports = router;
