import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5173/api/tasks'); // Update URL if needed
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    return (
      (!priorityFilter || task.priority === priorityFilter) &&
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>

      {/* Filter & Search */}
      <div className="flex gap-4 mb-4">
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded flex-1"
        />
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {filteredTasks.length ? (
          filteredTasks.map(task => (
            <li key={task._id} className="border p-3 rounded shadow">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">Due: {task.dueDate?.slice(0, 10)}</p>
              <p className="text-sm font-bold">Priority: {task.priority}</p>
            </li>
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </ul>
    </div>
  );
};

export default Tasks;
