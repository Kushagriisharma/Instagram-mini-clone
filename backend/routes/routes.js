const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const auth = require('./auth');

const router = express.Router();
const JWT_SECRET = 'mysecretkey';

// USERS
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: 'User saved', data: user });
});

// POSTS
router.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

router.post('/posts', auth, async (req, res) => {
  const post = new Post({
    content: req.body.content,
    userId: req.user.userId
  });
  await post.save();
  res.json({ message: 'Post created', data: post });
});

// COMMENTS
router.get('/comments', async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
});

// AUTH
router.post('/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'User exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();

  res.json({ message: 'User registered' });
});

router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Wrong password' });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login success', token });
});

module.exports = router;
