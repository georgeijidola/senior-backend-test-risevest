import { User } from '../models/User'

interface RequestWithUser extends Request {
  user?: Partial<User>
}

export { RequestWithUser }
