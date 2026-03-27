import { Router } from "express";
import { adminJWT, userJWT } from "../helper";
import { portfolioController } from "../controllers";

const router = Router();

router.post("/add", adminJWT, portfolioController.addPortfolio);
router.put("/edit", adminJWT, portfolioController.editPortfolio);
router.get("/all", userJWT, portfolioController.getAllPortfolio);
router.delete("/:id", adminJWT, portfolioController.deletePortfolio);

export const portfolioRoute = router;
