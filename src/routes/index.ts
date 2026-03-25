"use strict";
import { Router } from "express";
import { authRoute } from "./auth";
import { heroSectionRoute } from "./heroSection";
import { userRoute } from "./user";

const router = Router();

router.use("/auth", authRoute);
router.use("/hero-section", heroSectionRoute);
router.use("/user", userRoute);

export { router };
