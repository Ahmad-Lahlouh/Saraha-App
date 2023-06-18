import { Router } from "express";
import * as userRouter from "./controller/user.controller.js"
import { auth } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../Services/errorHandling.js";
import fileUpload, { MHE } from "../../Services/multer.js";
const router = Router()

router.get('/profile',auth,asyncHandler(userRouter.profile))
router.patch('/profilePic',auth,fileUpload().single('image'),MHE,userRouter.profilePic)

export default router