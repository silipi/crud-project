const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/crud-project');
const app = express();
const { authRoutes } = require('./src/routes');

// Middleware:
app.use(cors());
app.use(express.json());

app.get('/health-check', (req, res) => {
  res.send({ hello: 'world' });
});

/* app.get('/test', auth, (req, res) => {
  res.status(200).json({ user: req.user });
}); */

// Routes:
app.use('/auth', authRoutes);

app.listen(3000, () => console.log('App is running!'));
