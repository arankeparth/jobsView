import { SDK } from "../sdk/sdk";

const fetchComments = async (taskId) => {
    try {
        const comments = await SDK.fetchComments(taskId);
        return comments;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};




export default fetchComments;