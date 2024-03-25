import { Router } from 'express'
import { getTopUsersController } from '../controllers/users/getTopUsersController'
import { getUsersController } from '../controllers/users/getUsersController'
import { getPostsByUserController } from '../controllers/posts/getPostsByUserController'
import { createPostController } from '../controllers/posts/createPostController'
import { validator } from '../middlewares/validator'
import { createPost } from '../schema/createPost.schema'
import { protect } from '../middlewares/protect'
import { getPostsByUser } from '../schema/getPostsByUser.schema'

const router = Router()

router.get('/', protect, getUsersController)

router
  .route('/:id/posts')
  .get(validator(getPostsByUser), protect, getPostsByUserController)
  .post(validator(createPost), protect, createPostController)

router.get('/top-users', protect, getTopUsersController)

export default router
