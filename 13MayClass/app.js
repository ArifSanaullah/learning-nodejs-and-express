const express = require("express");
const morgan = require("morgan");
const albums = require("./api/routers/albums");
const tracks = require("./api/routers/tracks");
const user = require("./api/routers/user");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.send({
    platform: process.platform,
    uptime: process.uptime(),
    status: 200,
    "content-type": req.headers["content-type"],
    "user-agent": req.headers["user-agent"],
    host: req.headers.host,
    env: process.env.NODE_ENV,
    port: process.env.PORT,
  });
});

app.use("/user", user);
app.use("/tracks", tracks);
app.use("/albums", albums);

//handling unknown(404) route requests
app.use((req, res, next) => {
  req.status = 404;
  const error = new Error("Page not found");
  next(error);
});

app.use((error, req, res, next) => {
  res.status(req.status).send({ error: { message: error.message } });
});

module.exports = ({ port, cb }) => {
  app.listen(port, cb);
};
