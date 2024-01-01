import Router from 'express'
import { AuthController } from '../../modules/auth/controllers/auth.controller'

const authRouter = Router()

const authController = new AuthController()

authRouter.post('/signin', authController.signin)
authRouter.post('/signup', authController.signup)

export default authRouter