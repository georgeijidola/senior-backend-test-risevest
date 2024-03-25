import { Router } from 'express'
import { signInController } from '../controllers/auth/signInController'
import { signUpController } from '../controllers/auth/signUpController'
import { validator } from '../middlewares/validator'
import { signUpSchema } from '../../schema/signup.schema'
import { signInSchema } from '../../schema/signin.schema'

const router = Router()

router.post('/sign-up', validator(signUpSchema), signUpController)
router.post('/sign-in', validator(signInSchema), signInController)

export default router
