import React, { useState } from 'react';
import './RegisterForm.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [FormData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...FormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (FormData.password === FormData.confirmPassword) {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/auth/register",
          {
            fullName: FormData.fullName,
            password: FormData.password,
            email: FormData.email,
          }
        );
        console.log(response);
        const { token } = response.data;
        localStorage.setItem("token", token);
        dispatch(login(token));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h1>Register Form</h1>
      <div className="form-group">
        <label htmlFor="fullName" className="label">Full Name:</label>
        <input
          type="text"
          id="fullName"
          name='fullName'
          value={FormData.fullName}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="label">Email:</label>
        <input
          type="email"
          id="email"
          name='email'
          value={FormData.email}
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
          name='password'
          value={FormData.password}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword" className="label">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name='confirmPassword'
          value={FormData.confirmPassword}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <button type="submit" className="submit-btn-register">Register</button>
      <p >Already a user ? <a href="/login">Login</a> instead.</p>
    </form>
  );
};

export default RegisterForm;