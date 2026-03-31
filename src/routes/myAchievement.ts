import { Router } from "express";
import { adminJWT, userJWT } from "../helper";
import { myAchievementController } from "../controllers";

const router = Router();

router.post("/add", adminJWT, myAchievementController.addMyAchievement);
router.put("/edit", adminJWT, myAchievementController.editMyAchievement);
router.get("/all", userJWT, myAchievementController.getAllMyAchievement);
router.delete("/:id", adminJWT, myAchievementController.deleteMyAchievement);

export const myAchievementRouter = router;
