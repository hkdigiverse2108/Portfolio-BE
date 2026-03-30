import { Router } from "express";
import { adminJWT, userJWT } from "../helper";
import { skillController } from "../controllers";

const router = Router();

router.post("/add", adminJWT, skillController.addSkill);
router.put("/edit", adminJWT, skillController.editSkill);
router.get("/all", userJWT, skillController.getAllSkill);
router.delete("/:id", adminJWT, skillController.deleteSkill);

export const skillRouter = router;
