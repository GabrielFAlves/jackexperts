// app.js
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const router = require('./routes/router');
const { verifyToken } = require('./middlewares/authMiddleware'); // Alteração do caminho

const app = express();

app.use(express.json());

// Rotas de autenticação
app.use('/api/auth', authRoutes);

// Rotas de tarefas protegidas
app.use('/api', verifyToken, router);

module.exports = app;
