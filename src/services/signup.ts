import { User } from '../models'

const signup = async ({
  username,
  password
}: {
  username: string
  password: string
}): Promise<any> => {
  const newUser = await User.create({
    username,
    password
  })

  return newUser
}

export { signup }
