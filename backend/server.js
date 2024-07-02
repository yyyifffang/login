const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);

// 註冊路由
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: 'User registration failed', error: err.message });
  }
});

// 登錄路由
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt for username: ${username}`);

  const user = await User.findOne({ username });
  if (!user) {
    console.log('Invalid credentials: user not found');
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log('Invalid credentials: password mismatch');
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
  console.log('Login successful');
  res.json({ token });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
