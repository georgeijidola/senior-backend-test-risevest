import { Router } from 'express'
import { addCommentController } from '../controllers/comments/addCommentController'
import { getPostsController } from '../controllers/posts/getPostsController'
import { getPostController } from '../controllers/posts/getPostController'

const router = Router()

router.get('/', getPostsController)

router.get('/:id', getPostController)

router.post('/:id/comments', addCommentController)

export default router
