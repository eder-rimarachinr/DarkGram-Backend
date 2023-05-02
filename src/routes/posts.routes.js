import { Router } from 'express'
import * as PostController from '../controllers/posts.controller.js'
import { authJwt } from '../middlewares/index.js'
import multerMiddleware from '../middlewares/file.js'

const router = Router()

router.post('/', [authJwt.verifyToken, authJwt.isUser, multerMiddleware.single('myfile')], PostController.createPost)
router.get('/all/', [authJwt.verifyToken, authJwt.isUser], PostController.getPosts)
router.get('/user/', [authJwt.verifyToken, authJwt.isUser], PostController.getPostsByUser)
router.get('/user/:username', [authJwt.verifyToken, authJwt.isUser], PostController.getPostsByUserName)
router.get('/p/:postId', [authJwt.verifyToken, authJwt.isUser], PostController.getPostById)
router.put('/p/:postId', [authJwt.verifyToken, authJwt.isUser], PostController.updatePostById)
router.delete('/p/:postId', [authJwt.verifyToken, authJwt.isUser], PostController.deletePostById)

export default router
