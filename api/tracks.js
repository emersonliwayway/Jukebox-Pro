import express from "express";
const router = express.Router();
export default router;

import { getTracks, getTrackById } from "#db/queries/tracks";
import requireUser from "#middleware/requireUser";
import { getPlaylistsByTrackId } from "#db/queries/playlists";

router.route("/").get(async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.param("id", async (req, res, next, id) => {
  const track = await getTrackById(id);
  if (!track) return res.status(404).send("Track does not exist.");
  req.track = track;
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.track);
});

router.route("/:id/playlists").get(requireUser, async (req, res) => {
  const playlists = await getPlaylistsByTrackId(req.track.id);
  res.send(playlists);
});
