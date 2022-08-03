const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  response.json(users);
});

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });

  if (user) {
    response.json(user);
  } else {
    response.status(404).end();
  }
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  const passwordMinLength = 6;
  if (password.length < passwordMinLength) {
    return response.status(400).json({
      error: `User validation failed: password: Path \`password\` is shorter than the minimum allowed length (${passwordMinLength}).`,
    });
  }

  if (username === '') {
    return response.status(400).json({
      error: `User validation failed: Username required.`,
    });
  }

  if (name === '') {
    return response.status(400).json({
      error: `User validation failed: Name required.`,
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  return response.status(201).json(savedUser);
});

module.exports = usersRouter;
