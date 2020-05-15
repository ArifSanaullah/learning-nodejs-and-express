const tracks = require("express").Router();
const Track = require("../models/Track");
const Album = require("../models/Album");

tracks.get("/", async (req, res) => {
  try {
    const tracks = await Track.find({}).select("name _id albumId");
    if (!tracks) return res.status(404).send({ message: "No tracks found" });
    res.status(200).send(tracks);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

tracks.post("/", async (req, res, next) => {
  const { name, albumId } = req.body;
  try {
    const findAlbum = await Album.findById(albumId);

    if (!findAlbum) return res.status(404).send({ message: "Album not found" });

    const track = await new Track({ name, albumId }).save();
    const newTracks = [
      ...findAlbum.tracks.map((t) => ({ name: t.name, _id: t._id })),
      { name: track.name, _id: track._id },
    ];

    await Album.updateOne({ _id: albumId }, { $set: { tracks: newTracks } });
    res.status(201).send({ message: "Track created successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

tracks.get("/:trackId", (req, res) => {
  const trackId = req.params.trackId;
  const albumId = req.albumId;

  res.send({ trackId, albumId });
});

module.exports = tracks;
