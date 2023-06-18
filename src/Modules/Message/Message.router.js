import { Router } from "express";
import * as messageController from "./controller/Message.controller.js"
import { auth } from "../../middleware/auth.middleware.js";
const router = Router()

router.post('/:receiverId',messageController.sendMessage)
router.get('/',auth,messageController.getMessages)
router.delete('/:messageId',auth,messageController.deleteMessages)


export default router
