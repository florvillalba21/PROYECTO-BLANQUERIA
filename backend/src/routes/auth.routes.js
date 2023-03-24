const router = require("express").Router();

const { signIn, signUp } = require("../controllers/auth.controllers");
const checkDuplicatedUser = require("../middlewares/checkDuplicateUser");
const checkRolesExisted = require("../middlewares/checkRolesExisted");

router.post("/signup", [checkRolesExisted, checkDuplicatedUser], signUp);
router.post("/signin", signIn);

module.exports = router;
