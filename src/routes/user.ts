import { Router } from "express";
import { userController } from "../controllers";
import { adminJWT, userJWT } from "../helper";

const router = Router();

router.post("/update", adminJWT, userController.updateUserSection);
router.get("/get", userJWT, userController.getUserSection);

export const userRouter = router;
