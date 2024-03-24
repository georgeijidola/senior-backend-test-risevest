import request from 'supertest'
import { statusCodes } from '../src/managers/constants'
import { faker } from '@faker-js/faker'
import { app } from '../src/loaders/express'
import { signUpService } from '../src/services/signUpService'
import signToken from '../src/helpers/auth/signToken'
import { getUsersService } from '../src/services/getUsersService'
import { createPostService } from '../src/services/createPostService'
import { getPostsByUserService } from '../src/services/getPostsByUserService'

describe('Integration tests', () => {
  const { SUCCESS, CREATED } = statusCodes

  /**
   * Sign up
   */
  it('Sign up - POST /api/auth/sign-up', async () => {
    const response = await request(app).post('/api/auth/sign-up').send({
      username: faker.internet.userName(),
      password: faker.internet.password()
    })

    expect(response.status).toBe(CREATED)
    expect(response.body).toHaveProperty('message')
  })

  /**
   * Sign in
   */
  it('Sign in - POST /api/auth/sign-in', async () => {
    const credentials = {
      username: faker.internet.userName(),
      password: faker.internet.password()
    }

    await signUpService(credentials)

    const response = await request(app)
      .post('/api/auth/sign-in')
      .send(credentials)

    expect(response.status).toBe(SUCCESS)
    expect(response.body).toHaveProperty('token')
  })

  /**
   * Get Users
   */
  it('Get Users - GET /api/users', async () => {
    const createRandomUser = () => {
      return {
        username: faker.internet.userName(),
        password: faker.internet.password()
      }
    }

    const usersData = faker.helpers.multiple(createRandomUser, {
      count: 2
    })

    const [firstUser] = await Promise.all([
      signUpService(usersData[0]),
      signUpService(usersData[1])
    ])

    const bearerToken = 'Bearer ' + signToken(firstUser.id)

    const response = await request(app)
      .get('/api/users')
      .set('Authorization', bearerToken)

    expect(response.status).toBe(SUCCESS)
    expect(Array.isArray(response.body.data)).toBe(true)
  })

  /**
   * Create Post
   */
  it('Create Post - POST /api/users/${user.id}/posts', async () => {
    const credentials = {
      username: faker.internet.userName(),
      password: faker.internet.password()
    }

    const firstUser = await signUpService(credentials)

    const bearerToken = 'Bearer ' + signToken(firstUser.id)

    const postData = {
      title: faker.word.words(3),
      content: faker.word.words(10)
    }

    const response = await request(app)
      .post(`/api/users/${firstUser.id}/posts`)
      .set('Authorization', bearerToken)
      .send(postData)

    expect(response.status).toBe(CREATED)
    expect(response.body.data).toHaveProperty('title', postData.title)
  })

  /**
   * Get Posts
   */
  it('Get Posts - GET /api/posts', async () => {
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

    const bearerToken = 'Bearer ' + signToken(user.id)

    const response = await request(app)
      .get('/api/posts')
      .set('Authorization', bearerToken)

    expect(response.status).toBe(SUCCESS)
    expect(response.body.data.length).toBe(2)
  })

  /**
   * Get Posts
   */
  it('Get Post - GET /api/posts/:id', async () => {
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

    const [firstPost] = await Promise.all([
      createPostService(postsData[0]),
      createPostService(postsData[1])
    ])

    const bearerToken = 'Bearer ' + signToken(user.id)

    const response = await request(app)
      .get(`/api/posts/${firstPost.id}`)
      .set('Authorization', bearerToken)

    expect(response.status).toBe(SUCCESS)
    expect(response.body.data).toHaveProperty('title')
  })

  /**
   * Get Posts By User
   */
  it('Get Posts By User - GET /api/users/${user.id}/posts', async () => {
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

    const bearerToken = 'Bearer ' + signToken(user.id)

    const response = await request(app)
      .get(`/api/users/${user.id}/posts`)
      .set('Authorization', bearerToken)

    expect(response.status).toBe(SUCCESS)
    expect(response.body.data.length).toBe(2)
    expect(response.body.data[0]).toHaveProperty('title')
  })

  /**
   * Add comment to a post
   */
  it('Add comment - POST /api/posts/${post.id}/comments', async () => {
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

    const content = faker.word.words(5)

    const bearerToken = 'Bearer ' + signToken(commenter.id)

    const response = await request(app)
      .post(`/api/posts/${post.id}/comments`)
      .set('Authorization', bearerToken)
      .send({ content })

    expect(response.status).toBe(CREATED)
    expect(response.body.data).toHaveProperty('content', content)
  })

  /**
   * Get top Users, sorted by most posts and with their latest comment
   */
  it('Get top 3 Users - GET /api/top-users', async () => {
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

    await Promise.all([
      createPostService({ user_id: topUser.id, ...postsData[0] }),
      createPostService({ user_id: topUser.id, ...postsData[1] }),
      createPostService({ user_id: topUser.id, ...postsData[2] }),

      createPostService({ user_id: regularUserOne.id, ...postsData[3] }),
      createPostService({ user_id: regularUserOne.id, ...postsData[4] }),

      createPostService({ user_id: regularUserTwo.id, ...postsData[5] })
    ])

    const anyUser = (await getUsersService())[0]

    const bearerToken = 'Bearer ' + signToken(anyUser.id)

    const response = await request(app)
      .get('/api/users/top-users')
      .set('Authorization', bearerToken)

    expect(response.status).toBe(SUCCESS)
    expect(response.body.data.length).toBe(3)
    expect(response.body.data[0].id).toBe(topUser.id)
  })
})
