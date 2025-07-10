import express from 'express'
import authController from '~/controllers/auth.controller'
import { protectRoute } from '~/middlewares/protect.middleware'
import { utils } from '~/utils'

const router = express.Router()

router.route('/sign-up').post(utils.apiErrorHandler(authController.signUp))
router.post('/login', utils.apiErrorHandler(authController.login))
router.post('/refresh', utils.apiErrorHandler(authController.refreshNewAccessToken))

router.use(protectRoute)
router.post('/logout', utils.apiErrorHandler(authController.logout))

export const authRoute = router
