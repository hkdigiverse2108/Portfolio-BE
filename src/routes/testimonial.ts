import { Router } from "express";
import { testimonialController } from "../controllers";
import { adminJWT, userJWT } from "../helper";

const router = Router();

router.post("/add", adminJWT, testimonialController.addTestimonial);
router.put("/edit", adminJWT, testimonialController.editTestimonial);
router.get("/all", userJWT, testimonialController.getAllTestimonial);
router.delete("/:id", adminJWT, testimonialController.deleteTestimonial);

export const testimonialRouter = router;