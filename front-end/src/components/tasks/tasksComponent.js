// src/pages/TasksComponent.js
import React from 'react';
import { useTasks } from '../../contexts/TaskContext'; 

const TasksComponent = () => {
  const {
    tasks,
    newTask,
    setNewTask,
    editingTask,
    setEditingTask,
    error,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask
  } = useTasks();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Create Task</h2>
        <form onSubmit={handleCreateTask} className="mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Task title"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Task description"
              required
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700"
          >
            Add Task
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
        <ul>
          {tasks.map(task => (
            <li key={task.id} className="mb-4 p-4 border border-gray-300 rounded-md">
              <h3 className="text-lg font-medium">{task.title}</h3>
              <p className="mb-2">{task.description}</p>
              <button
                onClick={() => setEditingTask(task)}
                className="py-1 px-2 bg-blue-500 text-white font-semibold rounded-md mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="py-1 px-2 bg-red-500 text-white font-semibold rounded-md"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {editingTask && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
          <form onSubmit={handleUpdateTask}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="edit-title">Title</label>
              <input
                id="edit-title"
                type="text"
                value={editingTask.title}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="edit-description">Description</label>
              <textarea
                id="edit-description"
                value={editingTask.description}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-green-500 text-white font-semibold rounded-md"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TasksComponent;
