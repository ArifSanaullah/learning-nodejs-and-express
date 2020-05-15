const mongoose = require("mongoose");

const albumSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tracks: {
    type: Array,
    required: true,
  },
  singer: {
    type: String,
    default: "Unknown",
  },
});

module.exports = mongoose.model("Album", albumSchema);
