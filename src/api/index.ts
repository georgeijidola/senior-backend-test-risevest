import { Router } from 'express'
import all from './routes'

const router = Router()

router.use('/', all)

export default router
