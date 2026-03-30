"use strict";
import { Router } from "express";
import { authRoute } from "./auth";
import { clientLogoRoute } from "./clientLogo";
import { heroSectionRoute } from "./heroSection";
import { ourServiceRoute } from "./ourService";
import { portfolioRoute } from "./portfolio";
import { serviceRoute } from "./service";
import { skillRouter } from "./skill";
import { uploadRoute } from "./upload";
import { userRoute } from "./user";
import { workCountRoute } from "./workCount";
import { workExperienceRoute } from "./workExperience";

const router = Router();

router.use("/auth", authRoute);
router.use("/hero-section", heroSectionRoute);
router.use("/user", userRoute);
router.use("/work-count", workCountRoute);
router.use("/upload", uploadRoute);
router.use("/client-logo", clientLogoRoute);
router.use("/service", serviceRoute);
router.use("/our-service", ourServiceRoute);
router.use("/portfolio", portfolioRoute);
router.use("/work-experience", workExperienceRoute);
router.use("/skill", skillRouter);

export { router };
