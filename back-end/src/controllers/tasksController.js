const tasksService = require('../services/tasksService');

const getAll = async (req, res) => {
    const tasks = await tasksService.getAll();
    return res.status(200).json(tasks);
};

const createTask = async (req, res) => {
    const createdTask = await tasksService.createTask(req.body);
    return res.status(201).json(createdTask);
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    await tasksService.deleteTask(id);
    return res.status(204).json();
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    await tasksService.updateTask(id, req.body);
    return res.status(204).json();
};

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask,
};
