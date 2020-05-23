const Album = require("../models/Album");
const Track = require("../models/Track");

const search = async (req, res) => {
  const { searchQuery } = req.query;
  const tracks = await Track.find({ $text: { $search: searchQuery } });
  const albums = await Album.find({ $text: { $search: searchQuery } });
  return res.status(200).send({ tracks, albums });
};

module.exports = { search };
