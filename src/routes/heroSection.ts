import { Router } from "express";
import { heroSectionController } from "../controllers";
import { adminJWT, userJWT } from "../helper";

const router = Router();

router.post("/update", adminJWT, heroSectionController.updateHeroSection);
router.get("/get", userJWT, heroSectionController.getHeroSection);

export const heroSectionRoute = router;
