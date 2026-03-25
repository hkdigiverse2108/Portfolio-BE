import { Router } from "express";
import { userController } from "../controllers";
import { adminJWT } from "../helper";

const router = Router();

router.get("/get", adminJWT, userController.getUserSection);

export const userRoute = router;
