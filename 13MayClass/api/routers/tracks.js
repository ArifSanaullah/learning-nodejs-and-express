const tracks = require("express").Router();

const trackControllers = require("../controllers/tracks");
const requireAuth = require("../middlewares/requireAuth");

tracks.get("/", trackControllers.getAllTracks);

tracks.post("/", requireAuth, trackControllers.createTrack);

tracks.get("/:trackId", trackControllers.getTrack);

tracks.put("/:trackId", requireAuth, trackControllers.updateTrack);

tracks.delete("/:trackId", requireAuth, trackControllers.deleteTrack);

module.exports = tracks;
