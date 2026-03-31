import { Router } from "express";
import { contactUsController } from "../controllers";
import { adminJWT, userJWT } from "../helper";

const router = Router();

router.post("/add", userJWT, contactUsController.addContactUs);
router.put("/edit", adminJWT, contactUsController.editContactUs);
router.get("/all", adminJWT, contactUsController.getAllContactUs);
router.delete("/:id", adminJWT, contactUsController.deleteContactUs);

export const contactUsRouter = router;
