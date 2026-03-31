import { Router } from "express";
import { adminJWT, userJWT } from "../helper";
import { testimonialDescriptionController } from "../controllers";

const router = Router();

router.put("/update", adminJWT, testimonialDescriptionController.updateTestimonialDescription);
router.get("/get", userJWT, testimonialDescriptionController.getTestimonialDescription);

export const testimonialDescriptionRouter = router;
