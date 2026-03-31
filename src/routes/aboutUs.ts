import { Router } from "express";
import { aboutUsController } from "../controllers";
import { adminJWT, userJWT } from "../helper";

const router = Router();

router.put("/update", adminJWT, aboutUsController.updateAboutUs);
router.get("/get", userJWT, aboutUsController.getAboutUs);

export const aboutUsRouter = router;
