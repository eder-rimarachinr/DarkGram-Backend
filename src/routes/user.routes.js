import { Router } from 'express'
import * as UserController from '../controllers/users.controller.js'

import { authJwt, verifySignUp } from '../middlewares/index.js'

const router = Router()

router.post(
  '/',
  [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignUp.checkDuplicateUserNameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  UserController.createUser
)
router.get(
  '/',
  [authJwt.verifyToken, authJwt.isAdmin],
  UserController.getUsers
)
router.get(
  '/:userId',
  [authJwt.verifyToken, authJwt.isAdmin],
  UserController.getUserById
)
router.put(
  '/:userId',
  [authJwt.verifyToken, authJwt.isAdmin],
  UserController.updateUser
)
router.delete(
  '/:userId',
  [authJwt.verifyToken, authJwt.isAdmin],
  UserController.deleteUser
)

export default router
