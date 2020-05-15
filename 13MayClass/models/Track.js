const mongoose = require("mongoose");

const trackSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Track", trackSchema);
