const express = require("express");
const app = express();
const apis = require("./api");
const middlewares = require("./middleware");
const albums = require("./routers/albums");

app.use(express.json());

app.get("/health", apis.healthApi);

app.post("/signin/", middlewares.authMiddleware, apis.signInApi);

app.get("/", (req, res) => {
  res.send("/ route.");
});

app.post("/createuser", middlewares.createUserMiddleware, apis.createUserApi);

app.post("/getuser", middlewares.getUserMiddleware, apis.getUserApi);

app.use("/albums", albums);

module.exports = ({ port, cb }) => {
  app.listen(port, cb);
};
