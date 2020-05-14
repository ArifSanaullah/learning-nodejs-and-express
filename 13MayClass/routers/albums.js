const albums = require("express").Router();
const tracks = require("./tracks");

albums.get("/", (req, res) => {
  res.send(req.headers);
});

albums.get("/:albumId", (req, res) => {
  const myAlbum = req.params.albumId;
  res.send(myAlbum);
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
