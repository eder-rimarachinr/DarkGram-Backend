import { Router } from 'express'
import * as ProductController from '../controllers/products.controller.js'
import { authJwt } from '../middlewares/index.js'

const router = Router()

router.post('/', [authJwt.verifyToken, authJwt.isUser], ProductController.createProduct)
router.get('/', ProductController.getProducts)
router.get('/:userId', [authJwt.verifyToken, authJwt.isUser], ProductController.getProductsByUser)
router.get('/:productId', ProductController.getProductById)
router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], ProductController.updateProductById)
router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], ProductController.deleteProductById)

export default router
