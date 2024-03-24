import { User } from '../models'

const getUsersService = async (): Promise<User[]> => {
  const users = await User.findAll({
    attributes: ['id', 'username', 'postsCount']
  })

  const usersData = users.map((user) => user.toJSON())

  return usersData
}

export { getUsersService }
