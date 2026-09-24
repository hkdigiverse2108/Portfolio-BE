import { Router } from "express";
import { adminJWT, userJWT } from "../helper";
import { brandController } from "../controllers";

const router = Router();

router.post("/add", adminJWT, brandController.addBrand);
router.put("/edit", adminJWT, brandController.editBrand);
router.get("/all", userJWT, brandController.getAllBrand);
router.delete("/:id", adminJWT, brandController.deleteBrand);

export const brandRouter = router;
