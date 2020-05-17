const router = require("express").Router();

const tracks = require("./tracks");
const albumControllers = require("../controllers/albums");
const requireAuth = require("../middlewares/requireAuth");

router.get("/", albumControllers.getAllAlbums);

router.get("/:albumId", albumControllers.getAlbum);

router.post("/", albumControllers.createAlbum);

router.use("/:albumId/tracks", albumControllers.manageAlbumTracks, tracks);

router.put("/:albumId", requireAuth, albumControllers.updateAlbum);

router.delete("/:albumId", requireAuth, albumControllers.deleteAlbum);

module.exports = router;
