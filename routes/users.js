const router = require("express").Router();
const { signup, getUsers, login, protect } = require("./../controllers/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/", protect, getUsers);

module.exports = router;
