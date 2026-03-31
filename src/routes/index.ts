"use strict";
import { Router } from "express";
import { authRouter } from "./auth";
import { clientLogoRouter } from "./clientLogo";
import { heroSectionRouter } from "./heroSection";
import { ourServiceRouter } from "./ourService";
import { portfolioRouter } from "./portfolio";
import { serviceRouter } from "./service";
import { skillRouter } from "./skill";
import { uploadRouter } from "./upload";
import { userRouter } from "./user";
import { workCountRouter } from "./workCount";
import { workExperienceRouter } from "./workExperience";
import { awardsRouter } from "./awards";
import { testimonialDescriptionRouter } from "./testimonialDescription";
import { testimonialRouter } from "./testimonial";
import { blogRouter } from "./blog";
import { contactUsRouter } from "./contactUs";

const router = Router();

router.use("/auth", authRouter);
router.use("/hero-section", heroSectionRouter);
router.use("/user", userRouter);
router.use("/work-count", workCountRouter);
router.use("/upload", uploadRouter);
router.use("/client-logo", clientLogoRouter);
router.use("/service", serviceRouter);
router.use("/our-service", ourServiceRouter);
router.use("/portfolio", portfolioRouter);
router.use("/work-experience", workExperienceRouter);
router.use("/skill", skillRouter);
router.use("/awards", awardsRouter);
router.use("/testimonial-description", testimonialDescriptionRouter);
router.use("/testimonial", testimonialRouter);
router.use("/blog", blogRouter);
router.use("/contact-us", contactUsRouter);

export { router };
