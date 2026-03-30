import { Router } from "express";
import { adminJWT, userJWT } from "../helper";
import { blogController } from "../controllers";

const router = Router();

router.post("/add", adminJWT, blogController.addBlog);
router.put("/edit", adminJWT, blogController.editBlog);
router.get("/all", userJWT, blogController.allBlog);
router.delete("/:id", adminJWT, blogController.deleteBlog);

export const blogRouter = router;
