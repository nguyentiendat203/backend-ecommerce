import express from 'express'
import { authRoute } from '~/routes/v1/auth.route'
import { productRoute } from '~/routes/v1/product.route'

const router = express.Router()

router.use('/auth', authRoute)
router.use('/product', productRoute)

export const API_ROUTE_V1 = router
