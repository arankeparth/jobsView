import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigations
import { SDK } from '../sdk/sdk';
import './auth.css';
import { useAuth } from './AuthContext'
import LoadingIcons from 'react-loading-icons'
import Error from './errorMessgae';

const uuid = require('uuid');
function LoginPage() {  
        const navigate = useNavigate();
        const { login } = useAuth();
        const [username, setUsername] = useState('');
        const [pass, setPass] = useState('');
        const [err, setErr] = useState();
        const onUpdateEmail = (e) => {
                setUsername(e.target.value);
        };

        const onUpdatePass = (e) => {
                setPass(e.target.value);
        };

        const onClickLogin = async (e) => {
                e.preventDefault();
                const err = await login(username, pass);
                if (!err) {
                        navigate("/");
                } else {
                        setErr(err);
                }
        };

        const onClickRegister = (e) => {
                e.preventDefault();
                navigate("/register");
        }

        return (

                <div class="main-auth-box">
                        <div className="background">
                                <form className="auth-form">
                                        <h2 id='welcomeMat'>spice</h2>
                                        <Error error={err} />
                                        <br></br>
                                        <input type="text" onChange={onUpdateEmail} placeholder="Email or Phone" id="username" />
                                        <input type="password" onChange={onUpdatePass} placeholder="Password" id="password" />

                                </form>
                                <div class="button-container">
                                        <div><button onClick={onClickLogin} >Log In</button></div>
                                        <div><button onClick={onClickRegister} >Register</button></div>
                                </div>
                        </div>
                </div>

        );
}

export default LoginPage;


function RegisterPage() {
        const navigate = useNavigate();
        const [registerData, setRegisterData] = useState({
                firstname: '',
                lastname: '',
                email: '',
                age: 0,
                gender: '',
                password: ''
        });
        const [err, setErr] = useState();
        const handleChange = (e) => {
                const { name, value } = e.target;
                if (name === "age") {
                        setRegisterData({ ...registerData, [name]: parseInt(value) });
                }
                else {
                        setRegisterData({ ...registerData, [name]: value });
                }
        };

        const [validationErrors, setValidationErrors] = useState("");

        const validateForm = () => {
                let isValid = true;
                var errors = "";

                if (registerData.firstname === "" || registerData.firstname === undefined) {
                        setValidationErrors('First name is required');
                        isValid = false;
                }

               else if (registerData.lastname === "" || registerData.lastname === undefined) {
                        setValidationErrors('Last name is required');
                        isValid = false;
                }

                else if (registerData.email === "" || registerData.email === undefined) {
                        setValidationErrors('Email is required');
                        isValid = false;
                }

                else if (!registerData.age || registerData.age <= 0) {
                        setValidationErrors('Age is required');
                        isValid = false;
                }

                else if (registerData.gender === "" || registerData.gender === undefined) {
                        setValidationErrors("Gender is required");
                        isValid = false;
                }

                else if (registerData.password === "" || registerData.password === undefined) {
                        setValidationErrors('Password is required');
                        isValid = false;
                }

                else if (registerData.confirmPassword === "" || registerData.confirmPassword === undefined) {
                        setValidationErrors('Confirm Password is required');
                        isValid = false;
                } 
        
                return isValid;
        };

        const handleSubmit = async (e) => {
                e.preventDefault();
                
                if (!validateForm()) {
                        setErr("Please fill in all fields");
                        return;
                }
                if (registerData.password !== registerData.confirmPassword) {
                        setErr("Passwords do not match");
                        return;
                }
                const customerId = uuid.v4();
                console.log('customerId:', customerId);
                registerData.customerid = customerId;
                setRegisterData(registerData);
                const err = await SDK.createUser(registerData);
                if (err) {
                        console.error('Error creating user:', err);
                        setErr('Error creating user. please try with another email');
                        return;
                }
                navigate("/login");
        };



        return (
                <div class="main-auth-box">
                        <div className="background">
                                <Error error={err} />
                                <form onSubmit={handleSubmit} className="auth-form">

                                        <input
                                                type="text"
                                                name="firstname"
                                                value={registerData.firstname}
                                                onChange={handleChange}
                                                placeholder="First Name"
                                                required
                                        />


                                        <input
                                                type="text"
                                                name="lastname"
                                                value={registerData.lastname}
                                                onChange={handleChange}
                                                placeholder="Last Name"
                                                required
                                        />


                                        <input
                                                type="email"
                                                name="email"
                                                value={registerData.email}
                                                onChange={handleChange}
                                                placeholder="Email"
                                                required
                                        />

                                        <input
                                                type="number"
                                                name="age"
                                                onChange={handleChange}
                                                placeholder="Age"
                                                required
                                        />

                                        <select
                                                name="gender"
                                                value={registerData.gender}
                                                onChange={handleChange}
                                                required
                                        >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                        </select>

                                        <input
                                                type="password"
                                                name="password"
                                                value={registerData.password}
                                                onChange={handleChange}
                                                placeholder="Password"
                                                required
                                        />
                                        <input
                                                type="password"
                                                name="confirmPassword"
                                                onChange={handleChange}
                                                placeholder="Confirm Password"
                                                required
                                        />


                                </form>
                                <div class="button-container">
                                        <button type="submit" onClick={handleSubmit}>Register</button>
                                        <button onClick={() => navigate("/login")}>Back to Login</button>
                                </div>
                        </div>
                </div>
        );
}

export { RegisterPage };
