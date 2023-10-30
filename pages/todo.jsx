import React, { useState, useEffect } from 'react';
export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [filter, setFilter] = useState('All');

  const priorityColors = {
    Medium: 'orange',
    Low: 'green',
    High: 'red',
  };
  let id = tasks.length + 1;

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskInput) {
      //   let newTask = {
      //     id: id++,
      //     item: taskInput,
      //     priority
      //   };
      setTasks([
        ...tasks,
        {
          id: id++,
          item: taskInput,
          priority,
        },
      ]);
      setTaskInput('');
    }
  };

  const handleRemoveTask = (idx) => {
    const newTasks = [...tasks];
    newTasks.splice(idx, 1);
    setTasks(newTasks);
  };
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <h1>Todo</h1>
      <form onSubmit={handleAddTask}>
        <input
          type='text'
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder='New task'
          className='border rounded border-gray-600 p-1 mr-2'
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className='mr-2'
        >
          <option value='High'>High</option>
          <option value='Medium'>Medium</option>
          <option value='Low'>Low</option>
        </select>
        {taskInput}
        <button type='submit' className='bg-blue-500 text-white p-1 rounded'>
          Add
        </button>
      </form>
      <label>Filter by Priority: </label>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className='mb-4 ml-2'
      >
        <option value='All'>All</option>
        <option value='High'>High</option>
        <option value='Medium'>Medium</option>
        <option value='Low'>Low</option>
      </select>

      <ul>
        {tasks
          .filter((task) => filter === 'All' || task.priority === filter)
          .map((task, idx) => (
            <li key={task.id} className='flex'>
              <div className='flex justify-between'>
                <span className='font-bold'>
                  {task.id} {task.item} &nbsp;
                </span>
                <span className={`text-${priorityColors[task.priority]}-600`}>
                  {task.priority} &nbsp;
                </span>
              </div>
              <button
                onClick={() => handleRemoveTask(idx)}
                className='border-b border-red-500 text-red-500 font-bold'
              >
                {' '}
                Del{' '}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
