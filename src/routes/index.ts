"use strict";
import { Router } from "express";
import { authRoute } from "./auth";
import { heroSectionRoute } from "./heroSection";
import { userRoute } from "./user";
import { workCountRoute } from "./workCount";
import { uploadRoute } from "./upload";
import { clientLogoRoute } from "./clientLogo";
import { serviceRoute } from "./service";

const router = Router();

router.use("/auth", authRoute);
router.use("/hero-section", heroSectionRoute);
router.use("/user", userRoute);
router.use("/work-count", workCountRoute);
router.use("/upload", uploadRoute);
router.use("/client-logo", clientLogoRoute);
router.use("/service", serviceRoute);

export { router };
