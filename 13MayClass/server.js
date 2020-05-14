const express = require("express");
const morgan = require("morgan");
const apis = require("./api");
const middlewares = require("./middleware");
const albums = require("./routers/albums");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("/ route.");
});
app.get("/health", apis.healthApi);
app.post("/signin/", middlewares.authMiddleware, apis.signInApi);
app.post("/createuser", middlewares.createUserMiddleware, apis.createUserApi);
app.post("/getuser", middlewares.getUserMiddleware, apis.getUserApi);
app.put("/update-user", middlewares.updateUserMiddleware, apis.updateUser);
app.delete("/delete-user", middlewares.deleteUserMiddleware, apis.deleteUserApi);
app.use("/albums", albums);

module.exports = ({ port, cb }) => {
  app.listen(port, cb);
};
