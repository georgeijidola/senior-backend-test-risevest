import { Router } from 'express'
import { getTopUsersController } from '../controllers/users/getTopUsersController'
import { getUsersController } from '../controllers/users/getUsersController'
import { getPostsByUserController } from '../controllers/posts/getPostsByUserController'
import { createPostController } from '../controllers/posts/createPostController'

const router = Router()

router.get('/', getUsersController)

router
  .route('/:id/posts')
  .get(getPostsByUserController)
  .post(createPostController)

router.get('/top-users', getTopUsersController)

export default router
