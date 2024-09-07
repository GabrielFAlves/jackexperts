const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const router = require('./routes/router');
const { verifyToken } = require('./middlewares/authMiddleware');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api', verifyToken, router);

module.exports = app;
