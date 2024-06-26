import { faker } from '@faker-js/faker'

import { signUpService } from '../src/services/signUpService'
import { signInService } from '../src/services/signInService'
import { getUsersService } from '../src/services/getUsersService'
import { createPostService } from '../src/services/createPostService'
import { getPostsService } from '../src/services/getPostsService'
import { getPostsByUserService } from '../src/services/getPostsByUserService'
import { addCommentService } from '../src/services/addCommentService'
import { getTopUsersService } from '../src/services/getTopUsersService'
import { getPostService } from '../src/services/getPostService'

describe('Unit tests for services', () => {
  /**
   * Sign up
   */
  it('Sign up', async () => {
    const userData = {
      username: faker.internet.userName(),
      password: faker.internet.password()
    }

    const result = await signUpService(userData)

    expect(result).toHaveProperty('id')
  })

  /**
   * Sign in
   */
  it('Sign in', async () => {
    const credentials = {
      username: faker.internet.userName(),
      password: faker.internet.password()
    }

    await signUpService(credentials)

    const result = await signInService(credentials)

    expect(result).toHaveProperty('username')
  })

  /**
   * Get Users
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

    await Promise.all([
      signUpService(usersData[0]),
      signUpService(usersData[1])
    ])

    const result = await getUsersService()

    expect(result[0]).toHaveProperty('username')
  })

  /**
   * Create Posts
   */
  it('Create Post', async () => {
    const credentials = {
      username: faker.internet.userName(),
      password: faker.internet.password()
    }

    await signUpService(credentials)

    const { id } = (await getUsersService())[0]

    const postData = {
      title: faker.word.words(3),
      content: faker.word.words(10),
      user_id: id
    }

    const result = await createPostService(postData)

    expect(result).toHaveProperty('title', postData.title)
  })

  /**
   * Get Posts
   */
  it('Get Posts', async () => {
    const credentials = {
      username: faker.internet.userName(),
      password: faker.internet.password()
    }

    await signUpService(credentials)

    const user = (await getUsersService())[0]

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

    await Promise.all([
      createPostService(postsData[0]),
      createPostService(postsData[1])
    ])

    const result = await getPostsService()

    expect(result[0]).toHaveProperty('title')
  })

  /**
   * Get Post
   */
  it('Get Post', async () => {
    const credentials = {
      username: faker.internet.userName(),
      password: faker.internet.password()
    }

    await signUpService(credentials)

    const user = (await getUsersService())[0]

    const { id } = await createPostService({
      user_id: user.id,
      title: faker.word.words(3),
      content: faker.word.words(10)
    })

    const result = await getPostService(id)

    expect(result).toHaveProperty('title')
  })

  /**
   * Get Posts By User
   */
  it('Get Posts By User', async () => {
    const credentials = {
      username: faker.internet.userName(),
      password: faker.internet.password()
    }

    await signUpService(credentials)

    const user = (await getUsersService())[0]

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

    await Promise.all([
      createPostService(postsData[0]),
      createPostService(postsData[1])
    ])

    // TODO: Add comments for each post
    const result = await getPostsByUserService(user.id)

    expect(result[0]).toHaveProperty('title')
  })

  /**
   * Add comment to a post
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
      signUpService(usersData[0]),
      signUpService(usersData[1])
    ])

    const poster = users[0]
    const commenter = users[1]

    const post = await createPostService({
      title: faker.word.words(3),
      content: faker.word.words(10),
      user_id: poster.id
    })

    const commentData = {
      postId: post.id,
      userId: commenter.id,
      content: faker.word.words(5)
    }

    const comment = await addCommentService(commentData)

    expect(comment).toHaveProperty('content', commentData.content)
  })

  /**
   * Get top Users, sorted by most posts and with their latest comment
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
      signUpService(usersData[0]),
      signUpService(usersData[1]),
      signUpService(usersData[2])
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

    const [postOne] = await Promise.all([
      createPostService({ user_id: topUser.id, ...postsData[0] }),
      createPostService({ user_id: topUser.id, ...postsData[1] }),
      createPostService({ user_id: topUser.id, ...postsData[2] }),

      createPostService({ user_id: regularUserOne.id, ...postsData[3] }),
      createPostService({ user_id: regularUserOne.id, ...postsData[4] }),

      createPostService({ user_id: regularUserTwo.id, ...postsData[5] })
    ])

    const addComments = [
      addCommentService({
        postId: postOne.id,
        userId: topUser.id,
        content: faker.word.words(5)
      }),
      addCommentService({
        postId: postOne.id,
        userId: regularUserOne.id,
        content: faker.word.words(5)
      }),
      addCommentService({
        postId: postOne.id,
        userId: regularUserTwo.id,
        content: faker.word.words(5)
      })
    ]

    await Promise.all(addComments)

    const result = await getTopUsersService()

    expect(result[0].id).toBe(topUser.id)
    expect(result[0].latestComment).toHaveProperty('id')
    expect(result.length).toBe(3)
  })
})
