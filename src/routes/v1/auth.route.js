import express from 'express'
import authController from '~/controllers/auth.controller'
import { utils } from '~/utils'

const router = express.Router()

router.route('/').post(utils.apiErrorHandler(authController.signUp))
router.post('/login', utils.apiErrorHandler(authController.login))
router.post('/refresh', utils.apiErrorHandler(authController.refreshNewAccessToken))

export const authRoute = router
