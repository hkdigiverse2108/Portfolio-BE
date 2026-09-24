import { Router } from "express";
import { podcastShowController } from "../controllers";
import { adminJWT, userJWT } from "../helper";

const router = Router();

router.put("/update", adminJWT, podcastShowController.updatePodcastShow);
router.get("/get", userJWT, podcastShowController.getPodcastShow);

export const podcastShowRouter = router;
