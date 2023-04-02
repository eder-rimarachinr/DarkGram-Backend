import { Router } from 'express'
import * as PostController from '../controllers/posts.controller.js'
import { authJwt } from '../middlewares/index.js'

const router = Router()

router.post('/', [authJwt.verifyToken, authJwt.isUser], PostController.createPost)
router.get('/', [authJwt.verifyToken, authJwt.isUser], PostController.getPosts)
router.get('/:postId', PostController.getPostById)
router.put('/:postId', [authJwt.verifyToken, authJwt.isUser], PostController.updatePostById)
router.delete('/:postId', [authJwt.verifyToken, authJwt.isUser], PostController.deletePostById)

export default router
