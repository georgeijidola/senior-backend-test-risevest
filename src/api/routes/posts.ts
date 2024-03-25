import { Router } from 'express'
import { addCommentController } from '../controllers/comments/addCommentController'
import { getPostsController } from '../controllers/posts/getPostsController'
import { getPostController } from '../controllers/posts/getPostController'
import { validator } from '../middlewares/validator'
import { addComment } from '../schema/addComment.schema'
import { protect } from '../middlewares/protect'
import { getPost } from '../schema/getPost.schema'

const router = Router()

router.get('/', protect, getPostsController)

router.get('/:id', validator(getPost), protect, getPostController)

router.post(
  '/:id/comments',
  validator(addComment),
  protect,
  addCommentController
)

export default router
