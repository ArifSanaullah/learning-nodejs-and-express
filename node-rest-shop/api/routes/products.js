const express = require("express");
const router = express.Router();
const Product = require("../../models/product");
const mongoose = require("mongoose");

router.get("/", async (req, res, next) => {
  await Product.find()
    .then((docs) => {
      if (!docs) {
        return res.status(404).send({ error: "Prodcuts not found" });
      }
      res.status(200).send(docs);
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
});

router.post("/", async (req, res, next) => {
  const { name, price } = req.body;
  const product = new Product({ _id: mongoose.Types.ObjectId(), name, price });

  await product
    .save()

    .then((result) => {
      res.send({
        message: "handling POST request to /products",
        product: result,
      });
    })

    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
});

router.get("/:productId", async (req, res, next) => {
  const id = req.params.productId;

  await Product.findById(id)

    .then((doc) => {
      if (!doc) {
        return res
          .status(404)
          .send({ error: "No entry found with the given id" });
      }
      res.status(200).send(doc);
    })

    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
});

router.patch("/:productId", async (req, res, next) => {
  const id = req.params.productId;

  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  await Product.updateOne({ _id: id }, { $set: updateOps })

    .then((result) => {
      res.status(200).send(result);
    })

    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
});

router.delete("/:productId", async (req, res, next) => {
  const id = req.params.productId;

  await Product.remove({ _id: id })

    .then((result) => {
      res.status(200).send(result);
    })

    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
});

module.exports = router;
