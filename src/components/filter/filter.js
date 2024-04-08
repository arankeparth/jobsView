
import React, { useState } from 'react';
import './filter.css';

const Filter = ({ filterJson, setFilter, refreshListing }) => {
  const handleInputChange = (e) => {
    setFilter({ ...filterJson, [e.target.name]: e.target.value });
  };

  return (

    <div className="main-box">
      <div className="input-container">
      <div className="field-container">
      <label>Assignee:</label>
      <input
        type="text"
        onChange={handleInputChange}
        className="input-style"
        placeholder="Assignee"
        name="assignee"
        value={filterJson.assignee}
      />
      </div>

      <div className="field-container">
      <label>Status:</label>
      <select
        onChange={handleInputChange}
        name="status"
        value={filterJson.status}

      >
        <option value="">{'All'}</option>
        <option value="Open">{'Open'}</option>
        <option value="inProgress">{'In progress'}</option>
        <option value="completed">{'Completed'}</option>
      </select>
      </div>
      
      <div className="field-container">
      <label>Priority:</label>
      <select
        onChange={handleInputChange}
        name="priority"
        value={filterJson.priority}
      >
        <option value="">{'All'}</option>
        <option value="low">{'Low'}</option>
        <option value="medium">{'Medium'}</option>
        <option value="high">{'High'}</option>
      </select>
      </div>

     <div className="field-container">
     <label>Due Date:</label>
      <select
        id="dueDateComparison"
        onChange={handleInputChange}
        name="dueDateComparison"
        value={filterJson.dueDateComparison}
      ><option value="greater_than">{'>'}</option>
        <option value="smaller_than">{'<'}</option>
        <option value="exact">{'='}</option>
      </select>
      <input
        type="date"
        onChange={handleInputChange}
        className="input-style"
        placeholder="Due Date"
        name="dueDate"
        value={filterJson.dueDate}
      />
     </div>
      
      <div className="field-container">
      <label>Date Created:</label>
      <select
        id="dateCreatedComparison"
        onChange={handleInputChange}
        name="dateCreatedComparison"
        value={filterJson.dateCreatedComparison}
      ><option value="greater_than">{'>'}</option>
        <option value="smaller_than">{'<'}</option>
        <option value="exact">{'='}</option>
      </select>
      <input
        type="date"
        onChange={handleInputChange}
        className="input-style"
        placeholder="Date Created"
        name="dateCreated"
        value = {filterJson.dateCreated}
      />
      </div>
      </div>
      <button className="button-style" onClick={refreshListing} type='submit'>Search</button>

    </div>
  );
};

export default Filter;