const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const config = require("../../config");
const User = require("../../models/user");

const signupUser = (req, res, next) => {
  const { email, password } = req.body;
  User.find({ email }).then((users) => {
    if (users.length > 0) {
      return res.status(422).send({ message: "Mail already exists" });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          res.status(500).send({ message: err.message });
        } else {
          const user = new User({
            email,
            password: hash,
            _id: mongoose.Types.ObjectId(),
          });
          user
            .save()
            .then((result) => {
              res.status(201).send({ message: "User created", user: result });
            })
            .catch((err) => {
              res.status(500).send({ message: err.message });
            });
        }
      });
    }
  });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((result) => {
      if (!result) {
        return res.status(401).send({ message: "Auth failed" });
      }
      bcrypt.compare(password, result.password, (error, same) => {
        if (error) {
          return res.status(401).send({ message: "Auth failed 2" });
        }
        if (same) {
          const token = jwt.sign(
            { email: result.email, _id: result._id },
            config.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).send({ message: "Logged in", token });
        }
        return res.status(401).send({ message: "Auth failed" });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const deleteUser = async (req, res, next) => {
  try {
    const userDelete = await User.findOneAndRemove({
      _id: req.params.userId,
    });
    if (userDelete) {
      return res
        .status(200)
        .send({ message: "user deleted", _id: userDelete._id });
    }
    res.status(404).send({ message: "User does not exists" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { signupUser, loginUser, deleteUser };
