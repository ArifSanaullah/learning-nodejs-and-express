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

albums.get("/:albumId", (req, res) => {
  const myAlbum = req.params.albumId;
  res.send(myAlbum);
});

albums.post("/", (req, res) => {
  const { name, tracks = [], singer } = req.body;
  Album({ name, tracks, singer })
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
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
