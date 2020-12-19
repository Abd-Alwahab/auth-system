const router = require("express").Router();
const {
  signup,
  getUsers,
  login,
  protect,
  restricPermissions,
  forgotPassword,
  resetPassword,
} = require("./../controllers/auth");

router.post("/signup", signup);
router.post("/login", login);
router.patch("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);
router.get("/", protect, restricPermissions("admin"), getUsers);

module.exports = router;
