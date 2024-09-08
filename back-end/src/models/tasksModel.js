// models/tasksModel.js
const connection = require('../connection');

const getAllByUserId = async (userId) => {
    const [tasks] = await connection.execute('SELECT * FROM tasks WHERE user_id = ?', [userId]);
    return tasks;
};

const createTask = async (task, userId) => {
    const { title } = task;
    const dateUTC = new Date().toISOString(); // Alternativa ao Date.toUTCString()
    const query = 'INSERT INTO tasks (title, status, created_at, user_id) VALUES (?, ?, ?, ?)';
    const [createdTask] = await connection.execute(query, [title, 'pendente', dateUTC, userId]);
    return { insertId: createdTask.insertId };
};

const deleteTask = async (id, userId) => {
    const [removedTask] = await connection.execute('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, userId]);
    return removedTask;
};

const updateTask = async (id, task, userId) => {
    const { title, status } = task;
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ? AND user_id = ?';
    const [updatedTask] = await connection.execute(query, [title, status, id, userId]);
    return updatedTask;
};

module.exports = {
    getAllByUserId,
    createTask,
    deleteTask,
    updateTask,
};
