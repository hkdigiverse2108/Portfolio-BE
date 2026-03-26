import { Router } from "express";
import { adminJWT, userJWT } from "../helper";
import { serviceController } from "../controllers";

const router = Router();

router.post("/add", adminJWT, serviceController.addService);
router.put("/edit", adminJWT, serviceController.editService);
router.get("/all", userJWT, serviceController.getAllService);
router.delete("/:id", adminJWT, serviceController.deleteService);

export const serviceRoute = router;
