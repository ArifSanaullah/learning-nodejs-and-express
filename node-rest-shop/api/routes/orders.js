const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send({ message: "handling GET request to /orders" });
});

router.post("/", (req, res, next) => {
  const { productId, quantity } = req.body;
  res.send({
    message: "handling POST request to /orders",
    order: { productId, quantity },
  });
});

router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  res.send({ message: "Order details", id });
});

router.delete("/:orderId", (req, res, next) => {
  res.send({ message: "Order deleted!", id: req.params.orderId });
});

module.exports = router;
