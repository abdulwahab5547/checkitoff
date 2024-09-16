import express, { Router, json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import User, { findOne} from './models/user.model.js';
import cors from 'cors';
const app = express();
const router = Router();
import pkg from 'body-parser';
const { json: _json } = pkg;
import token from 'jsonwebtoken';
const { sign, verify } = token;
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware
app.use(json());
// app.use(cors({
//   origin: ["http://localhost:3000/receiptify-app-frontend"],
//   methods: ["POST", "GET"],
//   credentials: true
// }));

app.use(cors({
    origin: '*',
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid or expired token' });
      req.user = user;
      next();
  });
}




// Routes
router.post('/signup', async (req, res) => {
  const { username, password} = req.body;
  try {
    const newUser = new User({ username, password});
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = generateToken(user);

        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Today tasks

app.get('/api/today-tasks', authenticateToken, async (req, res) => {
  try {
      const user = await User.findById(req.user.id);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json({ tasks: user.todayTasks });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.post('/api/today-tasks', authenticateToken, async (req, res) => {
  try {
      const { tasks } = req.body;

      // Validate the structure of tasks and subtasks
      if (!Array.isArray(tasks) || !tasks.every(task => 
          typeof task.text === 'string' &&
          typeof task.completed === 'boolean'
      )) {
          return res.status(400).json({ message: 'Invalid task format' });
      }

      const user = await User.findById(req.user.id);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      user.todayTasks = tasks;
      await user.save();

      res.json({ message: 'Tasks saved successfully', tasks: user.todayTasks });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Upcoming tasks

app.get('/api/upcoming-tasks', authenticateToken, async (req, res) => {
  try {
      const user = await User.findById(req.user.id);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json({ tasks: user.upcomingTasks });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.post('/api/upcoming-tasks', authenticateToken, async (req, res) => {
  try {
      const { tasks } = req.body;

      if (!Array.isArray(tasks) || !tasks.every(task => 
          typeof task.text === 'string' &&
          typeof task.completed === 'boolean'
      )) {
          return res.status(400).json({ message: 'Invalid task format' });
      }

      const user = await User.findById(req.user.id);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      user.upcomingTasks = tasks;
      await user.save();

      res.json({ message: 'Tasks saved successfully', tasks: user.upcomingTasks });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// Account details

app.get('/api/account-settings', authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id, 'username password');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ username: user.username, password: user.password });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

app.put('/api/account-settings', authenticateToken, async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findById(req.user.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (username) user.username = username;
      if (password) user.password = password;  
  
      await user.save();
  
      res.json({ message: 'Account settings updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


// Example routes
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/something', (req, res) => res.send('Hello something something!'));

// Final middleware: mount the router
app.use('/api', router);

// Generatetoken function
function generateToken(user) {
    return sign({ id: user.id}, SECRET_KEY, {
      expiresIn: '24h',
    });
}

// Connect to MongoDB and start server
const uri = process.env.MONGODB_URL;
mongoose.connect(uri, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Server running on port ${port}`));