// src/contexts/TaskContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token não encontrado. Por favor, faça login novamente.');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get('http://localhost:3333/api/tasks', {
          headers: { 'Authorization': token }
        });
        setTasks(response.data);
      } catch (err) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token não encontrado. Por favor, faça login novamente.');
      return;
    }
    try {
      await axios.post('http://localhost:3333/api/tasks', newTask, {
        headers: { 'Authorization': token }
      });
      setNewTask({ title: '', description: '' });
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token não encontrado. Por favor, faça login novamente.');
      return;
    }
    try {
      await axios.put(`http://localhost:3333/api/tasks/${editingTask.id}`, editingTask, {
        headers: { 'Authorization': token }
      });
      setTasks(tasks.map(task => (task.id === editingTask.id ? editingTask : task)));
      setEditingTask(null);
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token não encontrado. Por favor, faça login novamente.');
      return;
    }
    try {
      await axios.delete(`http://localhost:3333/api/tasks/${id}`, {
        headers: { 'Authorization': token }
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const value = {
    tasks,
    newTask,
    setNewTask,
    editingTask,
    setEditingTask,
    error,
    loading,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
