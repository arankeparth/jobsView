import { SDK } from "../sdk/sdk";

export const GetTasks = async (tasks, setTasks, setTaskSummary, filter) => {
    try {
        const tasksData = await SDK.fetchTasks(filter);
        if (tasksData) {
            setTasks(tasksData);
        }
        console.log(tasksData)
        var openTasks = tasksData.filter(task => task.status === "Open");
        var inProgressTasks = tasksData.filter(task => task.status === 'inProgress');
        var completedTasks = tasksData.filter(task => task.status === 'completed');
        console.log(openTasks.length, inProgressTasks.length, completedTasks.length);
        setTaskSummary({ openTasks: openTasks.length, inProgressTasks: inProgressTasks.length, completedTasks: completedTasks.length });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};