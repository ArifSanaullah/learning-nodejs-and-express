const express = require("express");
const router = express.Router();
const multer = require("multer");

const checkAuth = require("../middleware/checkAuth");
const productsControllers = require("../controllers/products");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

router.get("/", productsControllers.getAllProducts);

router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  productsControllers.createProduct
);

router.get("/:productId", productsControllers.getProduct);

router.patch("/:productId", checkAuth, productsControllers.updateProduct);

router.delete("/:productId", checkAuth, productsControllers.deleteProduct);

module.exports = router;
