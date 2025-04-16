import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', dueDate: '', priority: '' });
  const [editingId, setEditingId] = useState(null);

  const API = 'http://localhost:5173/api/tasks';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(`${API}/${editingId}`, form);
    } else {
      await axios.post(API, form);
    }

    setForm({ title: '', description: '', dueDate: '', priority: '' });
    setEditingId(null);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate?.slice(0, 10),
      priority: task.priority,
    });
    setEditingId(task._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{editingId ? 'Edit Task' : 'Create Task'}</h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-8">
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="w-full border p-2 rounded" required />
        <select name="priority" value={form.priority} onChange={handleChange} className="w-full border p-2 rounded" required>
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Create'}</button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Your Tasks</h3>
      {tasks.map(task => (
        <div key={task._id} className="border p-3 mb-3 rounded shadow">
          <h4 className="font-bold">{task.title}</h4>
          <p>{task.description}</p>
          <p>Due: {task.dueDate?.slice(0, 10)}</p>
          <p>Priority: {task.priority}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => handleEdit(task)} className="bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
            <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskManager;
