const express = require("express");
const authApis = require("../api/authApis");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/signup",
  authMiddleware.validationMiddleware,
  authMiddleware.signupMiddleware,
  authApis.signupApi
);
router.post(
  "/signin",
  authMiddleware.validationMiddleware,
  authMiddleware.signinMiddleware,
  authApis.signinApi
);
router.post("/blogs", authMiddleware.accessMiddleware, authApis.blogsApi);

module.exports = router;
