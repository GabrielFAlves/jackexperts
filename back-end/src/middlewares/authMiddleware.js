// middlewares/authMiddleware.js
const authService = require('../services/authService');

// Middleware de autenticação usando o serviço de autenticação
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Acesso negado' });

    try {
        const decoded = authService.verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    verifyToken,
};
