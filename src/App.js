import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { AuthProvider } from "./components/auth/AuthContext";
import PrivateRoutes from "./components/auth/PrivateRoute";
import BasicDemo from './components/TextEditor/TextEditor';

function App() {
  return (
    <AuthProvider>
      <Router>
        <PrivateRoutes />
      </Router>
    </AuthProvider>
    // <div>
    //   <BasicDemo/>
    // </div>
  );
}

export default App;
