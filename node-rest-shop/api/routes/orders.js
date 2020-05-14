const express = require("express");
const mongoose = require("mongoose");
const config = require("../../config");
const Order = require("../../models/order");
const Product = require("../../models/product");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.get("/", checkAuth, async (req, res, next) => {
  try {
    const orders = await Order.find()
      .select("product _id quantity")
      .populate("product", "name");
    if (orders) {
      const response = {
        count: orders.length,
        orders: orders.map((order) => {
          return {
            quantity: order.quantity,
            _id: order._id,
            product: order.product,
            request: {
              type: "GET",
              url: `${req.protocol}://${req.hostname}:${config.PORT}${req.baseUrl}/${order._id}`,
            },
          };
        }),
        request: {
          type: "GET",
          url: `${req.protocol}://${req.hostname}:${config.PORT}${req.baseUrl}`,
        },
      };
      return res.status(200).send(response);
    }
    res.status(404).send({ message: "No orders found" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/", checkAuth, async (req, res, next) => {
  const { productId, quantity } = req.body;
  Product.findOne({ _id: productId }).then(async (response) => {
    if (!response) {
      return res.status(404).send({ message: "Product not found" });
    }
    try {
      const order = new Order({
        product: productId,
        quantity,
        _id: mongoose.Types.ObjectId(),
      });
      const findOrder = await order.save();
      res.status(200).send({
        message: "Order created",
        createdOrder: {
          _id: findOrder._id,
          product: findOrder.product,
          quantity: findOrder.quantity,
        },
        request: {
          type: "GET",
          url: `${req.protocol}://${req.hostname}:${config.PORT}${req.baseUrl}/${findOrder._id}`,
        },
      });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
});

router.get("/:orderId", checkAuth, (req, res, next) => {
  const id = req.params.orderId;
  Order.findOne({ _id: id })
    .populate("product")
    .then((order) => {
      if (!order) {
        return res.status(404).send({ message: "Order not found" });
      }
      res.status(200).send({
        order: order,
        request: {
          type: "GET",
          url: `${req.protocol}://${req.hostname}:${config.PORT}${req.baseUrl}`,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

router.delete("/:orderId", checkAuth, async (req, res, next) => {
  try {
    const findOrder = await Order.findByIdAndRemove(req.params.orderId);
    if (!findOrder) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.status(200).send({
      message: "Order deleted",
      request: {
        type: "POST",
        url: `${req.protocol}://${req.hostname}:${config.PORT}${req.baseUrl}`,
        body: { product: "ObjectId", quantity: "Number" },
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
