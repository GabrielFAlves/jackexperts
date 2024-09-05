const tasksModel = require('../models/tasksModel');

const getAll = async () => {
    // Lógica adicional de negócio pode ser adicionada aqui
    return await tasksModel.getAll();
};

const createTask = async (taskData) => {
    // Lógica de validação ou transformação dos dados pode ser aplicada aqui
    return await tasksModel.createTask(taskData);
};

const deleteTask = async (id) => {
    // Lógica adicional, como verificar se a tarefa existe antes de deletar
    await tasksModel.deleteTask(id);
};

const updateTask = async (id, taskData) => {
    // Lógica de negócio adicional para validação dos dados
    await tasksModel.updateTask(id, taskData);
};

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask,
};
