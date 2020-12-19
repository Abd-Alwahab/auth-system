const router = require("express").Router();
const {
  signup,
  getUsers,
  login,
  protect,
  restricPermissions,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("./../controllers/auth");

const { updateMe } = require("./../controllers/users");

router.post("/signup", signup);
router.post("/login", login);
router.patch("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);
router.get("/", protect, restricPermissions("admin"), getUsers);

// router.patch("/me", protect, updateMe);
router.patch("/updateMyPassword", protect, updatePassword);

module.exports = router;
