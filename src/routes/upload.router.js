import { Router } from 'express'
import { getFile, getFileUser, getFileUserX, getFileX, uploadFile } from '../controllers/upload.controller.js'
import multerMiddleware from '../middlewares/file.js'
import { authJwt } from '../middlewares/index.js'

const router = Router()

router.post('/', [authJwt.verifyToken, authJwt.isUser, multerMiddleware.single('myfile')], uploadFile)
router.get('/file/', [authJwt.verifyToken, authJwt.isUser], getFile)
router.get('/file/:fileId', [authJwt.verifyToken, authJwt.isUser], getFileX)
router.get('/user/', [authJwt.verifyToken, authJwt.isUser], getFileUser)
router.get('/user/:userId', [authJwt.verifyToken, authJwt.isUser], getFileUserX)

export default router
