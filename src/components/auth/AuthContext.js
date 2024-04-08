// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { SDK } from '../sdk/sdk';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('isauthenticated') === 'true');
  console.log(authenticated);
  const login = async (username, pass) => {
    try {
        if (!username || !pass) {
          alert("Please enter a username and password");
          return;
        }
        const [resp, err] = await SDK.login(username, pass);
        if (err === null && resp.is_loggedin) {
            localStorage.setItem('token', resp.auth_token);
            localStorage.setItem('isauthenticated', true);
            localStorage.setItem('customerid', resp.customerid);
            setAuthenticated(true);
        } else {
          alert("Invalid credentials")
        }

        return err
    } catch (error) {
        console.error(error);
    }
};

  // useEffect(() => {
  //   if (authenticated === undefined) {
  //     setAuthenticated(false);
  //   }
  // }, []);

  const logout = () => {
    localStorage.setItem('token', "");
    localStorage.setItem('isauthenticated', false);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
