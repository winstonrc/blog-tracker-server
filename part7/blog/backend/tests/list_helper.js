const lodash = require('lodash')

const totalLikes = (blogs) => blogs.reduce((likes, blog) => likes + blog.likes, 0)

const favoriteBlog = (blogs) => {
  const maxLikeCount = Math.max(...blogs.map((blog) => blog.likes))
  return blogs.find((blog) => blog.likes === maxLikeCount)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const blogsCount = lodash.countBy(blogs, (blog) => blog.author)
  const maxBlogCount = Math.max(...Object.values(blogsCount))
  // eslint-disable-next-line no-shadow
  const authors = Object.entries(blogsCount).map(([author, blogs]) => ({
    author,
    blogs,
  }))

  return authors.find((author) => author.blogs === maxBlogCount)
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const blogsByAuthor = lodash.groupBy(blogs, (blog) => blog.author)
  // eslint-disable-next-line function-paren-newline
  const likeCounts = lodash.mapValues(
    // eslint-disable-next-line no-shadow
    blogsByAuthor, (blogs) => lodash.sumBy(blogs, (blog) => blog.likes))
  const maxLikeCount = Math.max(...Object.values(likeCounts))
  const authors = Object.entries(likeCounts).map(([author, likes]) => ({
    author,
    likes,
  }))

  return authors.find((author) => author.likes === maxLikeCount)
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
