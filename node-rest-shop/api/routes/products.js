const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const config = require("../../config");
const checkAuth = require("../middleware/checkAuth");
const Product = require("../../models/product");

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

router.get("/", async (req, res, next) => {
  await Product.find()
    .select("name price _id productImage")
    .then((docs) => {
      if (!docs) {
        return res.status(404).send({ error: "Products not found" });
      }
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            productImage: doc.productImage,
          };
        }),
        request: {
          type: "GET",
          description: "GET_LIST_OF_ALL_PRODUCTS",
          url: `${req.protocol}://${req.hostname}:${config.PORT}${req.baseUrl}`,
        },
      };
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
});

router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  async (req, res, next) => {
    const { name, price } = req.body;
    const product = new Product({
      _id: mongoose.Types.ObjectId(),
      name,
      price,
      productImage: req.file.path,
    });

    await product
      .save()

      .then((result) => {
        res.send({
          message: "Product successfully created",
          product: {
            name: result.name,
            price: result.price,
            _id: result._id,
            productImage: result.productImage,
            request: {
              type: "GET",
              description: "CREATE_A_PRODUCT",
              url: `${req.protocol}://${req.hostname}:${config.PORT}${req.baseUrl}/${result._id}`,
            },
          },
        });
      })

      .catch((err) => {
        res.status(500).send({ error: err.message });
      });
  }
);

router.get("/:productId", async (req, res, next) => {
  const id = req.params.productId;

  await Product.findById(id)
    .select("name price _id productImage")

    .then((doc) => {
      if (!doc) {
        return res
          .status(404)
          .send({ error: "No product found with the given id" });
      }
      res.status(200).send({
        name: doc.name,
        price: doc.price,
        _id: doc._id,
        productImage: doc.productImage,
        request: {
          type: "GET",
          description:
            "GET_DETAILS_OF_A_SINGLE_PRODCUT_WITH_THE_PROVIDED_PRODUCT_ID",
          url: `${req.protocol}://${req.hostname}:${config.PORT}${req.baseUrl}/${doc._id}`,
        },
      });
    })

    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
});

router.patch("/:productId", checkAuth, async (req, res, next) => {
  const id = req.params.productId;

  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  await Product.updateOne({ _id: id }, { $set: updateOps })

    .then((result) => {
      if (result.n > 0) {
        return res.status(200).send({
          message: "Product successfully updated",
          request: {
            type: "PATCH",
            description:
              "EDIT_AN_EXISTING_PRODUCT_WITH_PROVIDED_PRODUCT_ID_AND_NEW_PRODUCT_DATA",
          },
        });
      }
      res.status(404).send({
        message: "Product not found",
        request: {
          type: "PATCH",
          description:
            "EDIT_AN_EXISTING_PRODUCT_WITH_PROVIDED_PRODUCT_ID_AND_NEW_PRODUCT_DATA",
        },
      });
    })

    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
});

router.delete("/:productId", checkAuth, async (req, res, next) => {
  const id = req.params.productId;

  await Product.deleteOne({ _id: id })

    .then((result) => {
      if (result.n > 0) {
        return res.status(200).send({
          message: "Product successfully deleted",
          request: {
            type: "DELETE",
            description: "DELETE_A_PRODCUT_WITH_PROVIDED_PRODUCT_ID",
          },
        });
      }
      res.status(404).send({
        message: "Product not found",
        request: {
          type: "DELETE",
          description: "DELETE_A_PRODCUT_WITH_PROVIDED_PRODUCT_ID",
        },
      });
    })

    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
});

module.exports = router;
