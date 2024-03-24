import { Router } from 'express'
import { signInController } from '../controllers/auth/signInController'
import { signUpController } from '../controllers/auth/signUpController'

const router = Router()

router.post('/sign-up', signUpController)
router.post('/sign-in', signInController)

export default router
