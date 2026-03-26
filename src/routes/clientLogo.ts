import { Router } from "express";
import { adminJWT, userJWT } from "../helper";
import { clientLogoController } from "../controllers";

const router = Router();

router.post("/add", adminJWT, clientLogoController.addClientLogo);
router.put("/edit", adminJWT, clientLogoController.editClientLogo);
router.get("/all", userJWT, clientLogoController.getAllClientLogo);
router.delete("/:id", adminJWT, clientLogoController.deleteClientLogo);

export const clientLogoRoute = router;
