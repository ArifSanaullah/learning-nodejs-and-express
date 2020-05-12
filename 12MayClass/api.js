const User = require("./models/User");

const healthApi = (req, res) => {
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
};

const signInApi = (req, res) => {
  res.send({ query: req.query, params: req.params, user: req.user });
};

const createUserApi = async (req, res) => {
  await new User({ ...req.user }).save();
  res.send({ name: req.user.name });
};

const getUserApi = async (req, res) => {
  const { name } = req;
  const foundUser = await User.findOne({ name });
  if (!foundUser) {
    res.send({ error: "User not found" });
  }
  res.send({ user: foundUser });
};

module.exports = { healthApi, signInApi, createUserApi, getUserApi };
