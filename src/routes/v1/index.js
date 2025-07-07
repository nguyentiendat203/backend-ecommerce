import express from 'express'
import { authRoute } from '~/routes/v1/auth.route'

const router = express.Router()

router.use('/auth', authRoute)

export const API_ROUTE_V1 = router
