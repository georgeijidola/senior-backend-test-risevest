import { Router } from 'express'
import auth from './routes/auth'
import users from './routes/users'
import posts from './routes/posts'

const router = Router()

router.use('/auth', auth)
router.use('/users', users)
router.use('/posts', posts)

export default router
