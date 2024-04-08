// PrivateRoute.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import TaskList from '../TaskList/tasksList'; // Importing TaskList component
import Home from '../Home/Home';
import TicketPage from '../TicketPage/TicketPage';
import TaskForm from '../createTask/createTask';
import LoginPage from './auth';
import { RegisterPage}  from './auth';

const PrivateRoutes = () => {
    const { authenticated } = useAuth();
    console.log(authenticated)
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={authenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/create" element={authenticated ? <TaskForm /> : <Navigate to="/login" />} />
            <Route path="/tasklist/:filter" element={authenticated ? <TaskList /> : <Navigate to="/login" />} />
            <Route path="/tasklist" element={authenticated ? <TaskList /> : <Navigate to="/login" />} />
            <Route path="/ticketInfo/:ticketId" element={authenticated ? <TicketPage /> : <Navigate to="/login" />} />
        </Routes>
    );
};



export default PrivateRoutes;
