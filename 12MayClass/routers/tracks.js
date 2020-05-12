const tracks = require("express").Router();

tracks.get("/", (req, res) => {
  const albumId = req.albumId;
  res.send({ albumId });
});

tracks.get("/:trackId", (req, res) => {
  const trackId = req.params.trackId;
  const albumId = req.albumId;

  res.send({ trackId, albumId });
});

module.exports = tracks;
