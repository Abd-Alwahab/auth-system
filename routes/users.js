const router = require("express").Router();
const { signup, getUsers, login } = require("./../controllers/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/", getUsers);

module.exports = router;
