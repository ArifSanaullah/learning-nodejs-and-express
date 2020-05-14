const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const productsRoute = require("./api/routes/products");
const ordersRoute = require("./api/routes/orders");
const userRoute = require("./api/routes/user");

const app = express();
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Mongodb Connected!");
  })
  .catch((e) => {
    console.log("Error connecting to Mongodb: ", e.message);
  });

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(morgan("dev"));

//fixing CORS errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Authorization, Accept, Content-Type"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, DELETE, GET");
    return res.status(200).send({});
  }
  next();
});

app.use("/products", productsRoute);
app.use("/orders", ordersRoute);
app.use("/user", userRoute);

app.use((req, res, next) => {
  const error = new Error("Page not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status).send({ error: { message: error.message } });
});

module.exports = app;
