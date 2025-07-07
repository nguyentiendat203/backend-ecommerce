import authService from '~/services/auth.service'

class AuthController {
  signUp = async (req, res, next) => {
    try {
      const data = await authService.signUp(req.body)
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  login = async (req, res, next) => {
    try {
      const data = await authService.login(req.body)
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()
