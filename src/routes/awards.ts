import { Router } from "express";
import { adminJWT, userJWT } from "../helper";
import { awardsController } from "../controllers";

const router = Router();

router.post("/add", adminJWT, awardsController.addAwards);
router.put("/edit", adminJWT, awardsController.editAwards);
router.get("/all", userJWT, awardsController.getAllAwards);
router.delete("/:id", adminJWT, awardsController.deleteAwards);

export const awardsRouter = router;
