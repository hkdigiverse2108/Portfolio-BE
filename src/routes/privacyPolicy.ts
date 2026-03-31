import { Router } from "express";
import { privacyPolicyController } from "../controllers";
import { adminJWT, userJWT } from "../helper";

const router = Router();

router.put("/update", adminJWT, privacyPolicyController.updatePrivacyPolicy);
router.get("/get", userJWT, privacyPolicyController.getPrivacyPolicy);

export const privacyPolicyRouter = router;
