import { NextFunction, Request, Response } from 'express'

const asyncHandler =
  (asyncFn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(asyncFn(req, res, next)).catch(next)

export { asyncHandler }
