const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  tracks: {
    type: Array,
    required: true,
  },
  singer: {
    type: String,
    default: "Unknown",
    index: true
  },
});

module.exports = mongoose.model("Album", albumSchema);
