import express from 'express'
import productController from '~/controllers/product.controller'
import { protectRoute } from '~/middlewares/protect.middleware'
import { utils } from '~/utils'

const router = express.Router()

router.use(protectRoute)
router.post('/', utils.apiErrorHandler(productController.createProduct))

export const productRoute = router
