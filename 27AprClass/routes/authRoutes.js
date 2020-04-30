const express = require("express");
const authApis = require("../api/authApis");
const authMiddleware = require("../middlewares/authMiddleware");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.use(authMiddleware.validationMiddleware);

router.post("/signup", authMiddleware.signupMiddleware, authApis.signupApi);
router.post("/signin", authMiddleware.signinMiddleware, authApis.signinApi);
router.post("/blogs", authMiddleware.accessMiddleware, authApis.blogsApi);

module.exports = router;
