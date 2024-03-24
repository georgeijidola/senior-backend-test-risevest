import { User } from '../models'

const signUpService = async ({
  username,
  password
}: {
  username: string
  password: string
}): Promise<User> => {
  const newUser = await User.create({
    username,
    password
  })

  return newUser
}

export { signUpService }
