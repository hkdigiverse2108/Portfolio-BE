import { Router } from "express";
import { settingController } from "../controllers";
import { adminJWT, userJWT } from "../helper";

const router = Router();

router.put("/update", adminJWT, settingController.updateSetting);
router.get("/get", userJWT, settingController.getSetting);

export const settingRouter = router;
