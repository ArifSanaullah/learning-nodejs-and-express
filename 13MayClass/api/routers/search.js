const router = require("express").Router();

const searchApi = require("../controllers/search");

router.post("/", searchApi.search);

module.exports = router;
