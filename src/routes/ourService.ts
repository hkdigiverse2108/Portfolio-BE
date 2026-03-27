import { Router } from "express";
import { ourServiceController } from "../controllers";
import { adminJWT, userJWT } from "../helper";

const router = Router();

router.post("/add", adminJWT, ourServiceController.addOurService);
router.put("/edit", adminJWT, ourServiceController.editOurService);
router.get("/all", userJWT, ourServiceController.getAllOurService);
router.delete("/:id", adminJWT, ourServiceController.deleteOurService);

export const ourServiceRoute = router;
