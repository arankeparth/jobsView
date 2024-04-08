import { SDK } from '../sdk/sdk.js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskContainer from '../TaskContainer/TaskContainer.js';
import NavBar from '../NavBar/NavBar.js';
import '../Home/Home.css';
import Filter from '../filter/filter.js';
import { useNavigate } from 'react-router-dom';
import TaskArr from '../TaskArr/TaskArr.js';
// Add the missing import statement for TaskContainer
function TaskList() {
    var { filter } = "";
    const [editedFilter, setEditedFilter] = useState({
        dueDateComparison: 'exact',
        dateCreatedComparison: 'exact',
        priorityComparison: 'exact',
      });
    const [tasks, setTasks] = useState([{
    
    }]);
    const navigate = useNavigate();
    const setCurrTask = (index) => {
        navigate('/ticketInfo/' + tasks[index].id);
    }

    const refreshListing = async () => {
        fetchData();
      }

    const fetchData = async () => {
        try {
            console.log(editedFilter)
            const taskData = await SDK.fetchTasks(editedFilter);
            setTasks(taskData);
        } catch (error) {
            console.error('Error fetching task data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <NavBar/>
            <Filter filterJson={editedFilter} setFilter={setEditedFilter} refreshListing={refreshListing}/>
            <div style={{ margin: '10px', display:'flex', justifyContent: 'center', alignItems: 'center',flexWrap: 'wrap'}}>
            <TaskArr tasks={tasks} setTasks={setCurrTask}/>
            </div>
        </div>
    );
}

export default TaskList;