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

const updateUser = (req, res) => {
  const { username, password, newPassword } = req.user;
  User.findOneAndUpdate(
    { username, password },
    { $set: { password: newPassword } }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send({ message: "User updated" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
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
