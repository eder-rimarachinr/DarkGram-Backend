import { Router } from 'express'
import * as ProfileController from '../controllers/profile.controller.js'
import { authJwt } from '../middlewares/index.js'

const router = Router()

router.get('/', [authJwt.verifyToken, authJwt.isUser], ProfileController.getMyProfile)
router.get('/:username', [authJwt.verifyToken, authJwt.isUser], ProfileController.getProfileByUser)

export default router
