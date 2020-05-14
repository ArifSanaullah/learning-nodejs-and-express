const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/user");
const checkAuth = require("../middleware/checkAuth");

router.post("/signup", userControllers.signupUser);

router.post("/login", userControllers.loginUser);

router.delete("/:userId", checkAuth, userControllers.deleteUser);

module.exports = router;
