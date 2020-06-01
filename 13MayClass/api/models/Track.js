const mongoose = require("mongoose");

const trackSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  albumId: {
    _id: mongoose.Schema.Types.ObjectId,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
  },
});

module.exports = mongoose.model("Track", trackSchema);
