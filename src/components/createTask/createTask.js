import React, { useState } from 'react';
import './createTask.css'; 

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('medium');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to server)
        console.log("Submitted:", { title, description, dueDate, priority });
        // Reset form fields after submission
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('medium');
    };

    return (
        <div className="task-form-container">
      <h2>Create Task</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" cols="50" />
        </div>
        <div>
          <input type="date" placeholder="Due Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </div>
        <div>
          <select placeholder="Priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
    );
};

export default TaskForm;
