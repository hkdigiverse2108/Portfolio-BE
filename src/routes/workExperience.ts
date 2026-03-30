import { Router } from "express";
import { adminJWT, userJWT } from "../helper";
import { workExperienceController } from "../controllers";

const router = Router();

router.post("/add", adminJWT, workExperienceController.addWorkExperience);
router.put("/edit", adminJWT, workExperienceController.editWorkExperience);
router.get("/all", userJWT, workExperienceController.getAllWorkExperience);
router.delete("/:id", adminJWT, workExperienceController.deleteWorkExperience);

export const workExperienceRouter = router;
