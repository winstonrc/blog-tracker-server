const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there are blogs initially saved', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('should return correct number of blog posts', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the unique identifier is named \'id\'', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with status code 404 if id is invalid', async () => {
    const invalidId = mongoose.Types.ObjectId()

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(404)
  })

  test('fails with status code 404 if blog does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonExistingId}`)
      .expect(404)
  })
})

describe('addition of a new blog', () => {
  let authorization

  beforeEach(async () => {
    const newUser = {
      username: 'newUser',
      name: 'new user',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    authorization = {
      Authorization: `bearer ${result.body.token}`,
    }
  })

  test('succeeds with status code 201 if data is valid', async () => {
    const newBlog = {
      title: 'self-titled',
      author: 'Myself',
      url: 'www.mywebsite.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(authorization)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map((b) => b.title)
    expect(contents).toContain('self-titled')
  })

  test('when likes property is missing, the value properly defaults to 0', async () => {
    const newBlog = {
      title: 'self-titled',
      author: 'Myself',
      url: 'www.mywebsite.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(authorization)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]
    expect(lastBlog.likes).toBe(0)
  })

  test('fails with status code 400 if data is missing title', async () => {
    const newBlog = {
      author: 'Myself',
      url: 'www.mywebsite.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(authorization)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('fails with status code 400 if data is missing url', async () => {
    const newBlog = {
      title: 'self-titled',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(authorization)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('fails with status code 401 if a token is not provided', async () => {
    const newBlog = {
      title: 'self-titled',
      author: 'Myself',
      url: 'www.mywebsite.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

describe('deletion of a blog', () => {
  let authorization

  beforeEach(async () => {
    const newUser = {
      username: 'newUser',
      name: 'new user',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    authorization = {
      Authorization: `bearer ${result.body.token}`,
    }
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'self-titled',
      author: 'Myself',
      url: 'www.mywebsite.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(authorization)
      .expect(201)

    const currentBlogs = await helper.blogsInDb()
    expect(currentBlogs).toHaveLength(blogsAtStart.length + 1)

    const allBlogs = await helper.blogsInDb()
    const blogToDelete = allBlogs.find((b) => b.title === newBlog.title)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(authorization)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const contents = blogsAtEnd.map((r) => r.title)
    expect(contents).not.toContain(blogToDelete.title)
  })

  test('fails with status code 401 if a token is not provided', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'self-titled',
      author: 'Myself',
      url: 'www.mywebsite.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(authorization)
      .expect(201)

    const currentBlogs = await helper.blogsInDb()
    expect(currentBlogs).toHaveLength(blogsAtStart.length + 1)

    const allBlogs = await helper.blogsInDb()
    const blogToDelete = allBlogs.find((b) => b.title === newBlog.title)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)
  })
})

describe('updating a blog', () => {
  test('blog likes can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedLikes = blogToUpdate.likes + 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: updatedLikes })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]
    expect(updatedBlog.likes).toBe(updatedLikes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
