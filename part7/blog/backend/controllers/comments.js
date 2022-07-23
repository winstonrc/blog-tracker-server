/* eslint-disable no-underscore-dangle */
const commentsRouter = require('express').Router();
const Comment = require('../models/comment');
const Blog = require('../models/blog');

commentsRouter.get('/', async (request, response) => {
  const blogId = request.args.id;
  const comments = await Comment.find({ blog: blogId });
  response.json(comments);
});

commentsRouter.post('/', async (request, response) => {
  const { text } = request.body;
  const blogId = request.args.id;

  if (!text) {
    return response.status(400).json({ error: 'no comment provided' });
  }

  const blog = await Blog.findById(blogId);

  if (!blog) {
    return response.status(404).json({ error: 'no blog' });
  }

  const comment = new Comment({
    text,
    date: Date(),
    blog: blog._id,
  });

  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();

  return response.status(201).json(savedComment);
});

module.exports = commentsRouter;
