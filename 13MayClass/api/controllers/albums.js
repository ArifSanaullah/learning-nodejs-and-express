const Album = require("../models/Album");
const Track = require("../models/Track");

const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find({});
    if (!albums) return res.status(404).send({ message: "No albums found" });

    res.status(200).send({ count: albums.length, albums });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAlbum = async (req, res) => {
  const albumId = req.params.albumId;
  try {
    const album = await Album.findOne({ _id: albumId });
    if (!album) return res.status(404).send({ message: "No album found" });

    res.status(200).send(album);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createAlbum = async (req, res) => {
  try {
    const { name, tracks = [], singer } = req.body;

    await new Album({ name, tracks, singer }).save();

    res.status(200).send({ message: "Album created successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const manageAlbumTracks = async (req, res, next) => {
  try {
    const foundAlbum = await Album.findById(req.params.albumId);

    if (!foundAlbum)
      return res.status(404).send({ message: "Album not found" });

    req.albumId = req.params.albumId;
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateAlbum = async (req, res) => {
  try {
    const updatedProps = {};
    for (const prop of req.body) {
      updatedProps[prop.propName] = prop.value;
    }

    const prevAlbum = await Album.findByIdAndUpdate(req.params.albumId, {
      $set: updatedProps,
    });

    if (!prevAlbum) return res.status(404).send({ message: "Album not found" });

    res.status(200).send(prevAlbum);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    const albumFound = await Album.findById(albumId);

    if (!albumFound)
      return res.status(404).send({ message: "Album not found" });

    await Album.findByIdAndDelete(albumId);
    await Track.deleteMany({ albumId });

    res.status(200).send({ message: "Album Deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getAllAlbums,
  getAlbum,
  createAlbum,
  manageAlbumTracks,
  updateAlbum,
  deleteAlbum,
};
