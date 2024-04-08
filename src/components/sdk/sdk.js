const { baseURL } = require('../../consts/server.js');

class HttpSDK {
    // Method to fetch tasks
    async fetchTasks(filter) {
        try {
            const response = await fetch(`${baseURL}:5050/task/get`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify(filter),
            });
            if (response.status === 401) {
                console.log("getting here")
                window.location.href = '/login'; // Redirect to login page
                return null;
            }
            const tasks = await response.json();
            console.log("tasks", tasks)
            if (tasks === "Invalid token") {
                window.location.href = '/login';
            }
            if (tasks === null) {
                return [];
            }
            return tasks;
        } catch (error) {
            window.location.href = '/login';
            alert('Error fetching tasks:', error);
            console.error('Error fetching tasks:', error);
            return null;
        }
    }

    async createTask(taskData) {
        try {
            const response = await fetch(`${baseURL}:5050/task/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify(taskData),
            });
            if (response.status === 401) {
                window.location.href = '/login'; // Redirect to login page
                return null;
            }
            const err = await response.json();
            return err;
        } catch (error) {
            console.error('Error creating task:', error);
            return error;
        }
    }

    async deleteTask(taskId) {
        try {
            const response = await fetch(`${baseURL}/tasks/${taskId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                return true;
            } else if (response.status === 401) {
                window.location.href = '/login'; // Redirect to login page
                return null;
            } else {
                throw new Error('Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            return error;
        }
    }

    async updateTask(updatedTaskData) {
        try {
            const response = await fetch(`${baseURL}:5050/task/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTaskData),
            });
            if (response.status === 401) {
                window.location.href = '/login'; // Redirect to login page
                return null;
            }
            const err = await response.json();
            return err;
        } catch (error) {
            console.error('Error updating task:', error);
            return error;
        }
    }

    async createComment(commentData) {
        try {
            const response = await fetch(`${baseURL}:5050/task/comment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify(commentData),
            });
            if (response.status === 401) {
                window.location.href = '/login'; // Redirect to login page
                return null;
            }
            const err = await response.json();
            return err;
        } catch (error) {
            console.error('Error creating comment:', error);
            return error;
        }
    }

    async fetchComments(taskId) {
        try {
            const response = await fetch(`${baseURL}:5050/task/comment/get/${taskId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
            if (response.status === 401) {
                window.location.href = '/login'; // Redirect to login page
                return null;
            }
            const comments = await response.json();
            if (comments === null) {
                return [];
            }
            return comments;
        } catch (error) {
            console.error('Error fetching comments:', error);
            return error;
        }
    }

    async verifyJWT(token, publicKey) {
        try {
            const response = await fetch(`${baseURL}:8080/authapi/v1/verifyjwt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'token': token,
                    'publicKey': publicKey,
                }),
            });
            if (response.status === 401) {
                window.location.href = '/login'; // Redirect to login page
                return null;
            } else if (response.status === 500) {
                return new Error('Internal Server Error');
            }
            return null;
        } catch (error) {
            console.error('Error verifying JWT:', error);
            return error;
        }
    }

    async login(username, password) {
        const credentials = {
            'username': username,
            'password': password,
        }
        try {
            const response = await fetch(`${baseURL}:8080/authapi/v1/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            if (response.status === 401) {
                window.location.href = '/login'; // Redirect to login page
                return [null, new Error('Failed to login')];
            } else if (response.status === 500) {
                console.log('Failed to login');
                return [null, new Error('Failed to login')];
            }
            const resp = await response.json();
            return [resp, null]
        } catch (error) {
            alert("failed to log in")
            console.error('Error logging in:', error);
            return [null, error];
        }
    }

    async createUser(userData) {
        try {
            const response = await fetch(`${baseURL}:5000/customerApi/v1/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.status === 401) {
                window.location.href = '/login'; // Redirect to login page
                return null;
            }
            const createdUser = await response.json();
            return createdUser;
        } catch (error) {
            console.error('Error creating user:', error);
            return error;
        }
    }

    async fetchCustomer(customerId) {
        try {
            const response = await fetch(`${baseURL}:5000/customerApi/v1/getcustomerinfo/${customerId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
            if (response.status === 401) {
                window.location.href = '/login'; // Redirect to login page
                return null;
            }
            const customer = await response.json();
            return customer;
        } catch (error) {
            console.error('Error fetching customer:', error);
            return error;
        }
    }
    async fetchTasks(filter) {
        try {
              const response = await fetch(`${baseURL}:5050/task/get`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify(filter),
            });
            const tasks = await response.json();
            if (tasks === null) {
                return [];
            }
            return tasks;
        } catch (error) {
            alert('Error fetching tasks:', error);
            console.error('Error fetching tasks:', error);
            return null;
        }
    }

    // Method to create a task
    async createTask(taskData) {
        try {
            const response = await fetch(`${baseURL}:5050/task/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify(taskData),
            });
            const err = await response.json();
            return err;
        } catch (error) {
            console.error('Error creating task:', error);
            return error;
        }
    }

    // Method to delete a task
    async deleteTask(taskId) {
        try {
            const response = await fetch(`${baseURL}/tasks/${taskId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                return true;
            } else {
                throw new Error('Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            return error;
        }
    }

    // Method to update a task
    async updateTask(updatedTaskData) {
        try {
            const response = await fetch(`${baseURL}:5050/task/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',   
                },
                body: JSON.stringify(updatedTaskData),
            });
            const err = await response.json();
            return err;
        } catch (error) {
            console.error('Error updating task:', error);
            return error;
        }
    }

    // Method to create a comment
    async createComment(commentData) {
        try {
            const response = await fetch(`${baseURL}:5050/task/comment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify(commentData),
            });
            const err = await response.json();
            return err;
        } catch (error) {
            console.error('Error creating comment:', error);
            return error;
        }
    }

    // Method to fetch comments
    async fetchComments(taskId) {
        try {
            const response = await fetch(`${baseURL}:5050/task/comment/get/${taskId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
            const comments = await response.json();
            if (comments === null) {
                return [];
            }
            return comments;
        } catch (error) {
            console.error('Error fetching comments:', error);
            return error;
        }
    }

    // Method to verify JWT token
    async verifyJWT(token, publicKey) {
        
        try {
            const response = await fetch(`${baseURL}:8080/authapi/v1/verifyjwt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'token': token,
                    'publicKey': publicKey,
                 }),
                 
            });
            if (response.status === 500) {
                return new Error('Internal Server Error');
            }
            return null;
        } catch (error) {
            console.error('Error verifying JWT:', error);
            return error;
        }
    }
    
    // Method to create a user
    async createUser(userData) {
        try {
            const response = await fetch(`${baseURL}:5000/customerApi/v1/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const createdUser = await response.json();
            return createdUser;
        } catch (error) {
            console.error('Error creating user:', error);
            return error;
        }
    }

    // Method to fetch customer
    async fetchCustomer(customerId) {
        try {
            const response = await fetch(`${baseURL}:5000/customerApi/v1/getcustomerinfo/${customerId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
            const customer = await response.json();
            return customer;
        } catch (error) {
            console.error('Error fetching customer:', error);
            return error;
        }
    }

}



export const SDK = new HttpSDK();