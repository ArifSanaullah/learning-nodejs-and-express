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

const updateUser = async (req, res) => {
  const { username, password, newPasswrod } = req.user;
  try {
    const findUser = await User.findOne({ username, password: null });

    if (!findUser) {
      return res.status(404).send({ error: "User not found!" });
    }

    await User.updateOne(
      { username },
      { password: newPasswrod }
    );

    res.status(200).send({
      success: true,
      userUpdated: true,
      originlUser,
    });
  } catch (error) {
    res.status(500).send("Something went wrong. Please try later!");
  }
};

const deleteUserApi = async (req, res) => {
  const id = req.id;
  try {
    const findUser = await User.findById(id);
    if (!findUser) {
      return res.status(404).send({ error: "User not Found", success: false });
    }

    const deleted = await User.findByIdAndDelete(id);
    res
      .status(200)
      .send({ success: true, userDeleted: true, deletedUser: deleted });
  } catch (error) {
    res.status(500).send({ error: error.message, success: false });
  }
};

module.exports = {
  healthApi,
  signInApi,
  createUserApi,
  getUserApi,
  updateUser,
  deleteUserApi,
};
