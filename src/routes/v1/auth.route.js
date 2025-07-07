import express from 'express'
import authController from '~/controllers/auth.controller'

const router = express.Router()

router.route('/').post(authController.signUp)
router.route('/login').post(authController.login)

export const authRoute = router
