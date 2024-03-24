import { Router } from 'express'
import auth from './routes/auth'
import users from './routes/users'
import posts from './routes/posts'

import { protect } from './middlewares/protect'

const router = Router()

router.use('/auth', auth)
router.use('/users', protect, users)
router.use('/posts', protect, posts)

export default router
