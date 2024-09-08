const tasksService = require("../services/tasksService");

const getAll = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await tasksService.getAllTasks(userId);
    return res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao obter tarefas", error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const createdTask = await tasksService.createTask(req.body, userId);
    return res.status(201).json(createdTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar tarefa", error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.taskId;
    const updatedData = req.body;
    const updatedTask = await tasksService.updateTask(
      taskId,
      updatedData,
      userId
    );
    return res.status(200).json(updatedTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar tarefa", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.taskId;
    await tasksService.deleteTask(taskId, userId);
    return res.status(200).json({ message: "Tarefa deletada com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar tarefa", error: error.message });
  }
};

module.exports = {
  getAll,
  createTask,
  updateTask,
  deleteTask,
};
