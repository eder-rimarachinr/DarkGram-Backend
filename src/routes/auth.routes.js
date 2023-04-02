import { Router } from 'express'
import * as AuthController from '../controllers/auth.controller.js'
import { verifySignUp } from '../middlewares/index.js'

const router = Router()

router.post('/signin', AuthController.SignIn)
router.post('/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], AuthController.SignUp)

export default router
