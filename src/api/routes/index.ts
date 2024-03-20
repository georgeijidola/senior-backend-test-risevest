import { Router } from 'express'

const router = Router()

router
  .route('/users')
  .get(() => {})
  .post(() => {})
router
  .route('/users/:id/posts')
  .get(() => {})
  .post(() => {})
router
  .route('/posts/:postId/comments')
  .get(() => {})
  .post(() => {})

export default router
