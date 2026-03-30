import { Router } from "express";
import { adminJWT } from "../helper";
import { testimonialDescriptionController } from "../controllers";

const router = Router();

router.put("/update", adminJWT, testimonialDescriptionController.updateTestimonialDescription);
router.get("/get", adminJWT, testimonialDescriptionController.getTestimonialDescription);

export const testimonialDescriptionRouter = router;
