const router = require("express").Router();
const { signup, getUsers } = require("./../controllers/auth");

router.post("/signup", signup);
router.get("/", getUsers);

module.exports = router;
