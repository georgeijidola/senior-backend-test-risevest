import { Router } from 'express'
import { signInController } from '../controllers/auth/signInController'
import { signUpController } from '../controllers/auth/signUpController'
import { validator } from '../middlewares/validator'
import { signUpSchema } from '../schema/signUp.schema'
import { signInSchema } from '../schema/signIn.schema'

const router = Router()

router.post('/sign-up', validator(signUpSchema), signUpController)
router.post('/sign-in', validator(signInSchema), signInController)

export default router
