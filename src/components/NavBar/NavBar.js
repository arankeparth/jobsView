import React from 'react';
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SDK } from '../sdk/sdk';
import './NavBar.css';
import { Editor } from 'primereact/editor';


const NavBar = () => {

    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const { logout } = useAuth()
    const [taskData, setTaskData] = useState({
        "id": 0,
        "summary": "",
        "description": "",
        "dueDate": "",
        "priority": "High",
        "status": "Open",
        "assignee": "",
        "dateCreated": "",
        "reporter": ""
    }
    );
    const allTasks = async () => {
        try {
            navigate("/tasklist/");
        } catch (error) {
            console.error('Error listing task:', error);
        }
    }
    const createTask = async () => {
        setShowForm(true);
    }

    const callCreateTask = async (taskData) => {
        if (!taskData.summary || !taskData.description || !taskData.dueDate || !taskData.priority || !taskData.status || !taskData.assignee) {
            alert('Please fill in all fields');
        } else {
            taskData.reporter = localStorage.getItem('customerid');
            setTaskData(taskData);
            console.log(taskData);
            const err = await SDK.createTask(taskData);
            if (err) {
                alert('Error creating task:', err);
            } else {
                alert('Task created successfully');
            }
            setShowForm(false);
        }
    }

    const createTaskInDB = async () => {
        const tempTaskData = { ...taskData, reporter: localStorage.getItem('customerid') };
        setTaskData(tempTaskData);
        callCreateTask(taskData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    }

    return (
        <nav className="navbar">
            <h1 onClick={() => { navigate("/") }} style={{ cursor: 'pointer' }}>Spice</h1>
            <div className="navbar-buttons">
                <button onClick={createTask} className="create-task-button">Create Task</button>
                <button onClick={allTasks}>All Tasks</button>
                <button onClick={logout}>Log Out</button>
            </div>
            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="field-container-create">

                            <div><label htmlFor="summary">Summary:</label></div>
                            <br></br>
                            <div><input type="text" id="summary" name="summary" required onChange={(e) => setTaskData({ ...taskData, summary: e.target.value })} /></div>

                        </div>
                        <br></br>
                        <div>
                            <div><label htmlFor="description" style={{fontWeight: 'bold'}}>Description:</label></div>
                            <br></br>
                            <Editor onTextChange={(e) => setTaskData({ ...taskData, description: e.htmlValue })} style={{ height: '320px', color: 'black' }} />
                            {/* <div><textarea id="description" name="description" rows="4" cols="50" onChange={(e) => setTaskData({ ...taskData, description: e.target.value })} /></div> */}

                        </div>

                        <form className="task-form" onSubmit={handleSubmit}>



                            <div className="field-container-create">

                                <div><label htmlFor="dueDate">Due Date:</label></div>
                                <div><input type="date" id="dueDate" name="dueDate" required onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })} /></div>

                            </div>
                            <div className="field-container-create">

                                <div><label htmlFor="priority">Priority:</label></div>
                                <div><select id="priority" name="priority" onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select></div>

                            </div>
                            <div className="field-container-create">

                                <div><label htmlFor="status">Status:</label></div>
                                <div><select id="status" name="status" onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}>
                                    <option value="open">Open</option>
                                    <option value="inProgress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select></div>

                            </div>
                            <div className="field-container-create">

                                <div> <label htmlFor="assignee">Assignee:</label></div>
                                <div><input type="text" name="assignee" required onChange={(e) => setTaskData({ ...taskData, assignee: e.target.value })} />
                                </div>
                            </div>
                            <div className="button-group">

                                <button id="cancelButt" onClick={() => setShowForm(false)}>Cancel</button>

                                <button onClick={createTaskInDB}>Create Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;