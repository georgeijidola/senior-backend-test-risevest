import { User } from '../models/User'

const getUsers = async (): Promise<any[]> => {
  const users = await User.findAll({
    attributes: ['id', 'username', 'postsCount']
  })

  const usersData = users.map((user) => user.toJSON())

  return usersData
}

export { getUsers }
