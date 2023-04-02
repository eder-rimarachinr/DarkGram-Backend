import { Router } from 'express'
import * as CommentController from '../controllers/comments.controller.js'
import { authJwt } from '../middlewares/index.js'

const router = Router()

router.post('/', [authJwt.verifyToken, authJwt.isUser], CommentController.createCommment)

export default router
