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
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.get("/", protect, restricPermissions("admin"), getUsers);

module.exports = router;
