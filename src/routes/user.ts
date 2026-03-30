import { Router } from "express";
import { userController } from "../controllers";
import { adminJWT, userJWT } from "../helper";

const router = Router();

router.put("/update", adminJWT, userController.updateUser);
router.get("/get", userJWT, userController.getUser);

export const userRouter = router;
