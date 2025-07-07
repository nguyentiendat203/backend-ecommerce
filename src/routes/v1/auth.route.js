import express from 'express'
import authController from '~/controllers/auth.controller'
import { utils } from '~/utils'

const router = express.Router()

router.route('/').post(utils.apiErrorHandler(authController.signUp))
router.route('/login').post(utils.apiErrorHandler(authController.login))

export const authRoute = router
