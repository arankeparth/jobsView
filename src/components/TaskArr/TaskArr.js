import React from 'react';
import TaskContainer from '../TaskContainer/TaskContainer';
import './TaskArr.css';

const TaskArr = ({ tasks, setTasks}) => {
    console.log(tasks);
    const handleTaskSelect = (index) => {
        setTasks(index);
    }
    const a = ""
    return (
        <div className='container'>
            {tasks.map((task, index) => (
                <TaskContainer  task={task} index={index} setCurrTask={handleTaskSelect}/>
            ))}
        </div>
    );
};

export default TaskArr;