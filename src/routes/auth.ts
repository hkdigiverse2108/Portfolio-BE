import { Router } from "express";
import { authController } from "../controllers";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/update-password", authController.updatePassword);
router.post("/reset-password", authController.resetPassword);
router.post("/verify-otp", authController.verifyOtp);
router.post("/resend-otp", authController.resendOtp);

export const authRouter = router;
