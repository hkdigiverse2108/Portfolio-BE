import { Router } from "express";
import { webinarController } from "../controllers";
import { adminJWT, userJWT } from "../helper";

const router = Router();

router.get("/get", userJWT, webinarController.getWebinar);
router.put("/update", adminJWT, webinarController.updateWebinar);
router.post("/register", userJWT, webinarController.registerWebinar);
router.post("/create-order", userJWT, webinarController.createRazorpayOrder);
router.post("/verify-payment", userJWT, webinarController.verifyRazorpayPayment);
router.post("/payment-failed", userJWT, webinarController.paymentFailed);
router.get("/registrations", adminJWT, webinarController.getWebinarRegistrations);

export const webinarRouter = router;
