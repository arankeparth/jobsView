import React from 'react';
import styled from 'styled-components';
import './TaskContainer.css';



const TaskContainer = ({task, index, setCurrTask}) => {
    const TaskTitle = styled.h2`
        color: red;
        font-size: 24px;
        font-weight: bold;
        // CSS styles for TaskTitle
    `;
    const TaskDescription = styled.p`
        color: blue;
        font-size: 16px;
        font-weight: normal;
        // CSS styles for TaskDescription
    `;
    const getInitials = (name) => {
        if (!name) {
            return '';
        }
        const names = name.split(' ');
        const initials = names.map((n) => n.charAt(0).toUpperCase()).join('');
        return initials;
    }

    return (
            <div className="task-card">
                <a href='' onClick={(e) => {
                    e.preventDefault();
                    setCurrTask(index)}}><h3>task{task.id}</h3></a>
                <p fieldname="priority" id="prio">{task.priority}</p>
                <p id='date' fieldname="due date">{task.dueDate}</p>
                <p id='assignee' fieldname="assignee" data-initials={getInitials(task.assignee)}></p>
            </div>
    );
};

export default TaskContainer;