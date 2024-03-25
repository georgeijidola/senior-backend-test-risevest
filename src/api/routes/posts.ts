import { Router } from 'express'
import { addCommentController } from '../controllers/comments/addCommentController'
import { getPostsController } from '../controllers/posts/getPostsController'
import { getPostController } from '../controllers/posts/getPostController'
import { validator } from '../middlewares/validator'
import { comment } from '../../schema/comment.schema'

const router = Router()

router.get('/', getPostsController)

router.get('/:id', getPostController)

router.post('/:id/comments', validator(comment), addCommentController)

export default router
