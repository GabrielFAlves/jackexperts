// services/tasksService.js
const tasksModel = require('../models/tasksModel');

const getAllTasks = async (userId) => {
    try {
        const tasks = await tasksModel.getAllByUserId(userId);
        return tasks;
    } catch (error) {
        throw new Error('Erro ao obter tarefas do banco de dados: ' + error.message);
    }
};

const createTask = async (taskData, userId) => {
    if (!taskData.title || taskData.title.trim() === '') {
        throw new Error('O título da tarefa é obrigatório e não pode estar vazio');
    }
    try {
        const createdTask = await tasksModel.createTask(taskData, userId);
        return createdTask;
    } catch (error) {
        throw new Error('Erro ao criar a tarefa no banco de dados: ' + error.message);
    }
};

const updateTask = async (taskId, updatedData, userId) => {
    if (!taskId || !updatedData) {
        throw new Error('ID da tarefa e dados para atualização são obrigatórios');
    }
    try {
        const existingTask = await tasksModel.getAllByUserId(userId);
        const task = existingTask.find(t => t.id === parseInt(taskId));
        if (!task) {
            throw new Error('Tarefa não encontrada ou usuário não autorizado');
        }
        const updatedTask = await tasksModel.updateTask(taskId, updatedData, userId);
        return updatedTask;
    } catch (error) {
        throw new Error('Erro ao atualizar a tarefa no banco de dados: ' + error.message);
    }
};

const deleteTask = async (taskId, userId) => {
    if (!taskId) {
        throw new Error('ID da tarefa é obrigatório');
    }
    try {
        const existingTask = await tasksModel.getAllByUserId(userId);
        const task = existingTask.find(t => t.id === parseInt(taskId));
        if (!task) {
            throw new Error('Tarefa não encontrada ou usuário não autorizado');
        }
        await tasksModel.deleteTask(taskId, userId);
        return { message: 'Tarefa deletada com sucesso' };
    } catch (error) {
        throw new Error('Erro ao deletar a tarefa no banco de dados: ' + error.message);
    }
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
};
