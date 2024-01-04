import React, { useState } from 'react';
import './LoginForm.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${BASE_URL}/api/auth/login`,
                {
                    email: formData.email,
                    password: formData.password,
                }
            );
            const { token } = response.data;
            localStorage.setItem("token", token);
            dispatch(login(token));
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Login Form</h1>
            <div className="form-group">
                <label htmlFor="email" className="label">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password" className="label">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input"
                    required
                />
            </div>
            <button type="submit" className="submit-btn-login">Login</button>
            <p>New to Apna Kitchen ? <a href="/register">Register</a> instead.</p>
        </form>
    );
};

export default LoginForm;