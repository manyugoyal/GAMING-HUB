const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/gaminghub', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB')).catch(err => console.log('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  likedGames: [String]
});
const User = mongoose.model('User', userSchema);
// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret';
// Generate a JWT token
function generateToken(username) {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
}
// Protect routes with JWT
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    console.warn("No token received");
    return res.status(401).send({ success: false, message: 'Unauthorized' });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(403).send({ success: false, message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}
// Signup Route
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).send({ success: false, message: 'Username already taken' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, likedGames: [] });
    await newUser.save();

    res.status(201).send({ success: true, message: 'User signed up successfully' });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
});
// Login Route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ success: false, message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ success: false, message: 'Invalid password' });
    }
    const token = generateToken(user.username);
    res.status(200).send({ success: true, message: 'Login successful', token });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
});
app.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });

    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    res.status(200).send({ success: true, username: user.username, likedGames: user.likedGames });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
});

app.post('/logout', (req, res) => {
  res.status(200).send({ success: true, message: 'Logged out successfully' });
});

app.get('/verify-token', authenticateToken, (req, res) => {
  res.status(200).json({ success: true });
});

app.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findOne({ username: req.user.username });

    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ success: false, message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
});
app.delete('/delete-account', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ username: req.user.username });

    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    res.status(200).send({ success: true, message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
