// // Import necessary modules and functions
// import request from 'supertest'
// import { statusCodes } from '../src/managers/constants'
// import { faker } from '@faker-js/faker'
// import { expressLoader } from '../src/loaders/express'

// const app = expressLoader()

// beforeAll(async () => {})

// describe('Integration tests', () => {
//   const { SUCCESS, CREATED } = statusCodes
//   /**
//    * 1. Sign up
//    */
//   it('Sign up', async () => {
//     const response = await request(app).post('/signup').send({
//       username: faker.internet.userName(),
//       password: faker.internet.password()
//     })

//     expect(response.status).toBe(CREATED)
//     expect(response.body).toHaveProperty('message')
//   })

//   /**
//    * 2. Sign in
//    */
//   it('Sign in', async () => {
//     const credentials = {
//       username: faker.internet.userName(),
//       password: faker.internet.password()
//     }

//     await signup(credentials)

//     const response = await request(app).post('/signin').send(credentials)

//     expect(response.status).toBe(SUCCESS)
//     expect(response.body).toHaveProperty('token')
//   })

//   /**
//    * 3. Get Users
//    */
//   it('Get Users', async () => {
//     const createRandomUser = () => {
//       return {
//         username: faker.internet.userName(),
//         password: faker.internet.password()
//       }
//     }

//     const usersData = faker.helpers.multiple(createRandomUser, {
//       count: 2
//     })

//     await Promise.all([signup(usersData[0]), signup(usersData[1])])

//     const response = await request(app).get('/users')

//     expect(response.status).toBe(SUCCESS)
//     expect(Array.isArray(response.body.data)).toBe(true)
//   })

//   /**
//    * 4. Create Posts
//    */
//   it('Create Post', async () => {
//     const credentials = {
//       username: faker.internet.userName(),
//       password: faker.internet.password()
//     }

//     await signup(credentials)

//     const signinResponse = await request(app).post('/signin').send(credentials)

//     const token = signinResponse.body.data.token

//     const postData = {
//       title: faker.word.words(3),
//       content: faker.word.words(10)
//     }

//     const response = await request(app)
//       .post('/posts')
//       .set('Authorization', `Bearer ${token}`)
//       .send(postData)

//     expect(response.status).toBe(CREATED)
//     expect(response.body.data).toHaveProperty('title', postData.title)
//   })

//   /**
//    * 5. Get Posts
//    */
//   it('Get Posts', async () => {
//     const credentials = {
//       username: faker.internet.userName(),
//       password: faker.internet.password()
//     }

//     await signup(credentials)

//     const user = (await getUsers())[0]

//     const createRandomPost = () => {
//       return {
//         user_id: user.id,
//         title: faker.word.words(3),
//         content: faker.word.words(10)
//       }
//     }

//     const postsData = faker.helpers.multiple(createRandomPost, {
//       count: 2
//     })

//     await Promise.all([createPost(postsData[0]), createPost(postsData[1])])

//     const response = await request(app).get('/posts')

//     expect(response.status).toBe(SUCCESS)
//     expect(response.body.data.length).toBe(2)
//   })

//   /**
//    * 6. Get Posts By User
//    */
//   it('Get Posts By User', async () => {
//     const credentials = {
//       username: faker.internet.userName(),
//       password: faker.internet.password()
//     }

//     await signup(credentials)

//     const user = (await getUsers())[0]

//     const createRandomPost = () => {
//       return {
//         user_id: user.id,
//         title: faker.word.words(3),
//         content: faker.word.words(10)
//       }
//     }

//     const postsData = faker.helpers.multiple(createRandomPost, {
//       count: 2
//     })

//     await Promise.all([createPost(postsData[0]), createPost(postsData[1])])

//     const response = await request(app).get(`/users/${user.id}/posts`)

//     expect(response.status).toBe(SUCCESS)
//     expect(response.body.data.length).toBe(2)
//     expect(Array.isArray(response.body.data[0])).toHaveProperty('title')
//   })

//   /**
//    * 7. Add comment to a post
//    */
//   it('Add comment to a post', async () => {
//     const createRandomUser = () => {
//       return {
//         username: faker.internet.userName(),
//         password: faker.internet.password()
//       }
//     }

//     const usersData = faker.helpers.multiple(createRandomUser, {
//       count: 2
//     })

//     const users = await Promise.all([
//       signup(usersData[0]),
//       signup(usersData[1])
//     ])

//     const poster = users[0]
//     const commenter = users[1]

//     const post = await createPost({
//       title: faker.word.words(3),
//       content: faker.word.words(10),
//       user_id: poster
//     })

//     const commentData = {
//       post_id: poster.id,
//       user_id: commenter.id,
//       content: faker.word.words(5)
//     }

//     const { token } = await signin(credentials)

//     const content = faker.word.words(5)

//     const response = await request(app)
//       .post(`/posts/${post.id}/comments`)
//       .set('Authorization', `Bearer ${token}`)
//       .send({ content })

//     expect(response.status).toBe(CREATED)

//     expect(response.body.data).toHaveProperty('content', content)
//   })

//   /**
//    * 8. Get top Users, sorted by most posts and with their latest comment
//    */
//   it('Get top Users', async () => {
//     const createRandomUser = () => {
//       return {
//         username: faker.internet.userName(),
//         password: faker.internet.password()
//       }
//     }

//     const usersData = faker.helpers.multiple(createRandomUser, {
//       count: 3
//     })

//     const [topUser, regularUserOne, regularUserTwo] = await Promise.all([
//       signup(usersData[0]),
//       signup(usersData[1]),
//       signup(usersData[2])
//     ])

//     const createRandomPost = () => {
//       return {
//         title: faker.word.words(3),
//         content: faker.word.words(10)
//       }
//     }

//     const postsData = faker.helpers.multiple(createRandomPost, {
//       count: 6
//     })

//     await Promise.all([
//       createPost({ user_id: topUser.id, ...postsData[0] }),
//       createPost({ user_id: topUser.id, ...postsData[1] }),
//       createPost({ user_id: topUser.id, ...postsData[2] }),

//       createPost({ user_id: regularUserOne.id, ...postsData[3] }),
//       createPost({ user_id: regularUserOne.id, ...postsData[4] }),

//       createPost({ user_id: regularUserTwo.id, ...postsData[5] })
//     ])

//     const response = await request(app).get('/top-users')

//     expect(response.status).toBe(SUCCESS)
//     expect(response.body.data.length).toBe(6)
//     expect(response.body.data[0].user_id).toBe(topUser.id)
//   })
// })

// afterAll(async () => {})
