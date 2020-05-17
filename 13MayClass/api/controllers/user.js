const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const config = require("../../config");

const signUpUser = async (req, res) => {
  try {
    const { email, password, username, name } = req.body;

    const foundUser = await User.findOne({ email });
    if (foundUser)
      return res.status(422).send({ message: "User Already exists" });

    const userSaved = await new User({
      username,
      email,
      name,
      password: await bcrypt.hash(password, 10),
    }).save();

    if (!userSaved)
      return res
        .status(500)
        .send({ message: "Something went wrong. Please try later." });

    res.status(200).send({ message: "Signed up successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const loginInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({
      email,
    });
    if (!foundUser) return res.status(401).send({ message: "Auth failed 1" });

    const isSame = await bcrypt.compare(password, foundUser.password);
    if (!isSame) return res.status(401).send({ message: "Auth failed 2" });

    if (isSame) {
      const token = jwt.sign({ email, _id: foundUser._id }, config.JWT_KEY, {
        expiresIn: "1h",
      });

      return res
        .status(200)
        .send({ message: "Successfully logged in ", token });
    }

    res.status(500).send({ message: "Auth failed 3" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { username } = req.params;

    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return res.send({ error: "User not found" });
    }

    res.send({ user: foundUser });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { username, password, newPassword } = req.body;

    const foundUser = await User.findOne({
      username,
    });

    if (!foundUser)
      return res
        .status(401)
        .send({ message: "Invalid username or password", success: false });

    const isSame = await bcrypt.compare(password, foundUser.password);
    if (!isSame)
      return res
        .status(401)
        .send({ message: "Invalid username or password", success: false });

    await User.findOneAndUpdate(
      { username },
      { $set: { password: await bcrypt.hash(newPassword, 10) } }
    );

    res
      .status(200)
      .send({ message: "Password changed successfully", success: true });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { username } = req.params;
  try {
    const findUser = await User.findOne({ username });

    if (!findUser) {
      return res.status(404).send({ error: "User not Found", success: false });
    }

    await User.findOneAndDelete({ username });

    res
      .status(200)
      .send({ success: true, message: "User successfully deleted" });
  } catch (error) {
    res.status(500).send({ error: error.message, success: false });
  }
};

module.exports = {
  loginInUser,
  signUpUser,
  getUser,
  changePassword,
  deleteUser,
};
