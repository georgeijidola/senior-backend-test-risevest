import { Request } from 'express'
import { User } from '../models'

interface RequestWithUser extends Request {
  user: Pick<User, 'id' | 'username'>
}

export { RequestWithUser }
