import React, { useState } from 'react';
import { useTasks } from '../../contexts/TaskContext';
import ModalTasks from '../modal/modalTasks';

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

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>

      <div className="mb-6">
        <button
          onClick={openCreateModal}
          className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700"
        >
          Create Task
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map(task => (
              <tr key={task.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingTask(task);
                      openEditModal();
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalTasks isOpen={isCreateModalOpen} onClose={closeCreateModal}>
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
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="status">Status</label>
            <input
              id="status"
              type="text"
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Task status"
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
      </ModalTasks>

      <ModalTasks isOpen={isEditModalOpen} onClose={closeEditModal}>
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <form onSubmit={handleUpdateTask}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="edit-title">Title</label>
            <input
              id="edit-title"
              type="text"
              value={editingTask?.title || ''}
              onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="edit-status">Status</label>
            <input
              id="edit-status"
              type="text"
              value={editingTask?.status || ''}
              onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
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
      </ModalTasks>
    </div>
  );
};

export default TasksComponent;
