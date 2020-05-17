const router = require("express").Router();

const userControllers = require("../controllers/user");
const requireAuth = require("../middlewares/requireAuth");

router.post("/login", userControllers.loginInUser);

router.post("/signup", userControllers.signUpUser);

router.get("/:username", requireAuth, userControllers.getUser);

router.put("/reset-password", requireAuth, userControllers.changePassword);

router.delete("/:username", requireAuth, userControllers.deleteUser);

module.exports = router;
