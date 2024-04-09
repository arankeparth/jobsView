import React, { useEffect, useState } from 'react';
import { SDK } from '../sdk/sdk'; // Assuming the fetchTasks method is exported from the 'sdk' module
import NavBar from '../NavBar/NavBar';
import TaskArr from '../TaskArr/TaskArr';
import TaskInfo from '../TaskInfo/TaskInfo';
import { GetTasks } from './utils';
import LoadingIcons from 'react-loading-icons'

const Home = () => {
    const [currTaskIndex, setCurrTask] = useState(0); // [task, setTask
    const [{ openTasks, inProgressTasks, completedTasks }, setTaskSummary] = useState({ openTasks: 0, inProgressTasks: 0, completedTasks: 0 });
    const [tasks, setTasks] = useState();

    const handleTaskSelection = (taskId) => {
        setCurrTask(taskId);
    };

    const init = async () => {
        const filter = {
            "reporter": localStorage.getItem('customerid')
        }
        await GetTasks(tasks, setTasks, setTaskSummary, filter);
    }
    useEffect(() => {
        init();
    }, []);
    console.log(tasks);
    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <NavBar />
            <div className="dashboard-container">
                <h2 className="dashboard-title">Your Tasks</h2>
                <div className="dashboard-summary">
                    <div className="dashboard-summary-item">
                        <h3 className="summary-item-title">Open Tasks</h3>
                        <p className="summary-item-count">{openTasks}</p>
                    </div>
                    <div className="dashboard-summary-item">
                        <h3 className="summary-item-title">In Progress Tasks</h3>
                        <p className="summary-item-count">{inProgressTasks}</p>
                    </div>
                    <div className="dashboard-summary-item">
                        <h3 className="summary-item-title">Completed Tasks</h3>
                        <p className="summary-item-count">{completedTasks}</p>
                    </div>
                </div>
            </div>
            {!tasks ? (
                <div class="loading"><div className='loading-box'><LoadingIcons.Oval stroke="gray" style={{scale: '2'}} speed={2}/></div></div>
            ) : tasks.length > 0 ? (
                <div className='tasks'>
                    <TaskArr tasks={tasks} setTasks={handleTaskSelection} />
                    <TaskInfo ticketInfo={tasks[currTaskIndex]} />
                </div>
            ) : (
                <p className='no-tasks'>No tasks created</p>
            )}

        </div>
    );
};

export default Home;