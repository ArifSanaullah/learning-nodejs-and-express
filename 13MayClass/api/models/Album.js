const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  tracks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // _id: mongoose.Schema.Types.ObjectId,
      ref: "Track",
    },
  ],
  singer: {
    type: String,
    default: "Unknown",
    index: true,
  },
});

module.exports = mongoose.model("Album", albumSchema);
