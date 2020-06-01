const Track = require("../models/Track");
const Album = require("../models/Album");

const getAllTracks = async (req, res) => {
  if (req.albumId) {
    const { albumId } = req;

    try {
      const album = await Album.findOne({ _id: albumId });

      if (!album) return res.status(404).send({ message: "No tracks found" });

      const tracks = await Track.find({ albumId });
      if (!tracks) return res.status(404).send({ message: "No tracks found" });

      return res.status(200).send(tracks);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }

  try {
    const tracks = await Track.find({})
      .select("name _id albumId")
      .populate({path: "albumId", select: "name"});

    if (!tracks) return res.status(404).send({ message: "No tracks found" });

    res.status(200).send([...tracks]);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createTrack = async (req, res, next) => {
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
};

const getTrack = async (req, res) => {
  const trackId = req.params.trackId;

  try {
    const track = await Track.findOne({ _id: trackId }).populate("albumId");
    console.log(track.populated("albumId"));
    if (!track) return res.status(404).send({ message: "Track not found" });

    res.status(200).send(track);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateTrack = async (req, res) => {
  /**
   * req.body syntax =>
   * [
   *    {"propName": "nameOfTheExistingPropertyThatNeedsToBeUpdated", value: "newValueOfTheProp"},
   *    {"propName": "nameOfTheExistingPropertyThatNeedsToBeUpdated", value: "newValueOfTheProp"},
   * ]
   */
  try {
    const trackId = req.params.trackId;
    const updatedProps = {};
    for (const prop of req.body) {
      updatedProps[prop.propName] = prop.value;
    }

    const prevTrack = await Track.findByIdAndUpdate(trackId, {
      $set: updatedProps,
    });

    if (!prevTrack) {
      return res.status(404).send({
        message: "Track not found",
      });
    }

    const updatedTrack = await Track.findOne(updatedProps);
    const trackAlbum = await Album.findOne({ _id: updatedTrack.albumId });

    const updatedTrackAlbum = trackAlbum.tracks.map((track) =>
      track._id.toString() === updatedTrack._id.toString()
        ? updatedTrack
        : track
    );

    await Album.findOneAndUpdate(
      { _id: updatedTrack.albumId },
      { $set: { tracks: updatedTrackAlbum } }
    );

    res.status(200).send({ message: "Track successfully updated!" });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteTrack = async (req, res) => {
  try {
    trackFound = await Track.findById(req.params.trackId);
    if (!trackFound)
      return res.status(404).send({ message: "Track not found" });

    const deletedTrack = await Track.findOneAndDelete({
      _id: req.params.trackId,
    });
    const deletedTrackAlbum = await Album.findById(deletedTrack.albumId);

    await Album.findByIdAndUpdate(deletedTrack.albumId, {
      $set: {
        tracks: deletedTrackAlbum.tracks.filter(
          (track) => track._id.toString() !== deletedTrack._id.toString()
        ),
      },
    });

    res.status(200).send({ message: "Track deleted successfully!" });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  getAllTracks,
  createTrack,
  getTrack,
  updateTrack,
  deleteTrack,
};
