const router = require("express").Router();
const {
  signup,
  getUsers,
  login,
  protect,
  restricPermissions,
} = require("./../controllers/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/", protect, restricPermissions("admin"), getUsers);

module.exports = router;
