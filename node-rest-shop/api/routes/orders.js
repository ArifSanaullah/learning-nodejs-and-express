const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const orderController = require("../controllers/order");

const router = express.Router();

router.get("/", checkAuth, orderController.getAllOrders);

router.post("/", checkAuth, orderController.createOrder);

router.get("/:orderId", checkAuth,orderController.getOrder);

router.delete("/:orderId", checkAuth, orderController.deleteOrder);

module.exports = router;
