import { Router } from "express";
import { adminJWT, userJWT } from "../helper";
import { workCountController } from "../controllers";

const router = Router();

router.post("/add", adminJWT, workCountController.addWorkCount);
router.put("/edit", adminJWT, workCountController.editWorkCount);
router.get("/all", userJWT, workCountController.getAllWorkCount);
router.delete("/:id", adminJWT, workCountController.deleteWorkCount);

export const workCountRoute = router;
