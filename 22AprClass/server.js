const express = require("express");
const middlewares = require("./middlewares");
const apis = require("./api");

const app = express();

app.use(express.json());

app.get("/login", middlewares.loginMiddleware, apis.loginApi);

app.post("/signup", middlewares.signupMiddleware, apis.signupApi);

module.exports = ({ PORT, cb }) => {
  app.listen(PORT, cb);
};
