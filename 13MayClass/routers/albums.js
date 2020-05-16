const albums = require("express").Router();
const tracks = require("./tracks");
const Album = require("../models/Album");

albums.get("/", async (req, res) => {
  try {
    const albums = await Album.find({});
    if (!albums) return res.status(404).send({ message: "No albums found" });

    res.status(200).send({ count: albums.length, albums });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

albums.get("/:albumId", async (req, res) => {
  const albumId = req.params.albumId;
  try {
    const album = await Album.findOne({ _id: albumId });
    if (!album) return res.status(404).send({ message: "No album found" });

    res.status(200).send(album);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

albums.post("/", async (req, res) => {
  try {
    const { name, tracks = [], singer } = req.body;

    await new Album({ name, tracks, singer }).save();

    res.status(200).send({ message: "Album created successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

albums.use(
  "/:albumId/tracks",
  (req, res, next) => {
    req.albumId = req.params.albumId;
    next();
  },
  tracks
);

module.exports = albums;
