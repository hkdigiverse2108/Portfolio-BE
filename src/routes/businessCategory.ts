import { Router } from "express";
import { adminJWT, userJWT } from "../helper";
import { businessCategoryController } from "../controllers";

const router = Router();

router.post("/add", adminJWT, businessCategoryController.addBusinessCategory);
router.put("/edit", adminJWT, businessCategoryController.editBusinessCategory);
router.get("/all", userJWT, businessCategoryController.getAllBusinessCategory);
router.delete("/:id", adminJWT, businessCategoryController.deleteBusinessCategory);

export const businessCategoryRouter = router;
