import { faker } from '@faker-js/faker'

import { signup } from '../src/services/signup'
import { signin } from '../src/services/signin'
import { getUsers } from '../src/services/getUsers'
import { createPost } from '../src/services/createPost'
import { getPosts } from '../src/services/getPosts'
import { getPostsByUser } from '../src/services/getPostsByUser'
import { addComment } from '../src/services/addComment'
import { getTopUsers } from '../src/services/getTopUsers'

beforeAll(async () => {})

describe('Unit tests for services', () => {
  /**
   * 1. Sign up
   */
  it('Sign up', async () => {
    const userData = {
      username: faker.internet.userName(),
      password: faker.internet.password()
    }

    const result = await signup(userData)

    expect(result).toHaveProperty('id')
  })

  /**
   * 2. Sign in
   */
  it('Sign in', async () => {
    const credentials = {
      username: faker.internet.userName(),
      password: faker.internet.password()
    }

    await signup(credentials)

    const result = await signin(credentials)

    expect(result).toHaveProperty('token')
  })

  /**
   * 3. Get Users
   */
  it('Get Users', async () => {
    const createRandomUser = () => {
      return {
        username: faker.internet.userName(),
        password: faker.internet.password()
      }
    }

    const usersData = faker.helpers.multiple(createRandomUser, {
      count: 2
    })

    await Promise.all([signup(usersData[0]), signup(usersData[1])])

    const result = await getUsers()

    expect(result.length).toBe(2)
    expect(result[0]).toHaveProperty('username', usersData[0].username)
  })

  /**
   * 4. Create Posts
   */
  it('Create Post', async () => {
    const credentials = {
      username: faker.internet.userName(),
      password: faker.internet.password()
    }

    await signup(credentials)

    const { id } = (await getUsers())[0]

    const postData = {
      title: faker.word.words(3),
      content: faker.word.words(10),
      user_id: id
    }

    const result = await createPost(postData)

    expect(result).toHaveProperty('title', postData.title)
  })

  /**
   * 5. Get Posts
   */
  it('Get Posts', async () => {
    const credentials = {
      username: faker.internet.userName(),
      password: faker.internet.password()
    }

    await signup(credentials)

    const user = (await getUsers())[0]

    const createRandomPost = () => {
      return {
        user_id: user.id,
        title: faker.word.words(3),
        content: faker.word.words(10)
      }
    }

    const postsData = faker.helpers.multiple(createRandomPost, {
      count: 2
    })

    await Promise.all([createPost(postsData[0]), createPost(postsData[1])])

    const result = await getPosts()

    expect(result.length).toBe(2)
    expect(result[0]).toHaveProperty('title', postsData[0].title)
  })

  /**
   * 6. Get Posts By User
   */
  it('Get Posts By User', async () => {
    const credentials = {
      username: faker.internet.userName(),
      password: faker.internet.password()
    }

    await signup(credentials)

    const user = (await getUsers())[0]

    const createRandomPost = () => {
      return {
        user_id: user.id,
        title: faker.word.words(3),
        content: faker.word.words(10)
      }
    }

    const postsData = faker.helpers.multiple(createRandomPost, {
      count: 2
    })

    await Promise.all([createPost(postsData[0]), createPost(postsData[1])])

    const result = await getPostsByUser(user.id)

    expect(result.length).toBe(2)
    expect(result[0]).toHaveProperty('title', postsData[0].title)
  })

  /**
   * 7. Add comment to a post
   */
  it('Add comment to a post', async () => {
    const createRandomUser = () => {
      return {
        username: faker.internet.userName(),
        password: faker.internet.password()
      }
    }

    const usersData = faker.helpers.multiple(createRandomUser, {
      count: 2
    })

    const users = await Promise.all([
      signup(usersData[0]),
      signup(usersData[1])
    ])

    const poster = users[0]
    const commenter = users[1]

    const post = await createPost({
      title: faker.word.words(3),
      content: faker.word.words(10),
      user_id: poster
    })

    const commentData = {
      post_id: poster.id,
      user_id: commenter.id,
      content: faker.word.words(5)
    }

    const comment = await addComment(commentData)

    expect(comment).toHaveProperty('content', commentData.content)
  })

  /**
   * 8. Get top Users, sorted by most posts and with their latest comment
   */
  it('Get top Users', async () => {
    const createRandomUser = () => {
      return {
        username: faker.internet.userName(),
        password: faker.internet.password()
      }
    }

    const usersData = faker.helpers.multiple(createRandomUser, {
      count: 3
    })

    const [topUser, regularUserOne, regularUserTwo] = await Promise.all([
      signup(usersData[0]),
      signup(usersData[1]),
      signup(usersData[2])
    ])

    const createRandomPost = () => {
      return {
        title: faker.word.words(3),
        content: faker.word.words(10)
      }
    }

    const postsData = faker.helpers.multiple(createRandomPost, {
      count: 6
    })

    await Promise.all([
      createPost({ user_id: topUser.id, ...postsData[0] }),
      createPost({ user_id: topUser.id, ...postsData[1] }),
      createPost({ user_id: topUser.id, ...postsData[2] }),

      createPost({ user_id: regularUserOne.id, ...postsData[3] }),
      createPost({ user_id: regularUserOne.id, ...postsData[4] }),

      createPost({ user_id: regularUserTwo.id, ...postsData[5] })
    ])

    const result = await getTopUsers()

    expect(result[0].user_id).toBe(topUser.id)
  })
})

afterAll(async () => {})
