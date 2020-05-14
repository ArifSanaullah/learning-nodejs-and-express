const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    default: "",
  },
  username: {
    type: String,
    required: true,
    trim: true,
    default: "",
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    default: "",
  },
  email: {
    type: String,
    required: true,
    trim: true,
    default: "",
    unique: true,
  },
});

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;
