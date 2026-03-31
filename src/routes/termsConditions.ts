import { Router } from "express";
import { termsConditionsController } from "../controllers";
import { adminJWT, userJWT } from "../helper";

const router = Router();

router.put("/update", adminJWT, termsConditionsController.updateTermsConditions);
router.get("/get", userJWT, termsConditionsController.getTermsConditions);

export const termsConditionsRouter = router;
