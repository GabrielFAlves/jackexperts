const express = require('express');
const tasksController = require('../controllers/tasksController');
const tasksMiddleware = require('../middlewares/tasksMiddleware');
const router = express.Router();

router.get('/tasks', tasksController.getAll);
router.post('/tasks', tasksMiddleware.validateFieldTitle, tasksMiddleware.validateFieldStatus, tasksController.createTask);
router.delete('/tasks/:taskId', tasksController.deleteTask);
router.put('/tasks/:taskId', tasksMiddleware.validateFieldTitle, tasksMiddleware.validateFieldStatus, tasksController.updateTask);

module.exports = router;
