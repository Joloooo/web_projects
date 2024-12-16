import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Authentication.css';
import './../../App.css';
import apiClient from '../ApiClient';
import GoogleAuth from './GoogleAuth'; // Import GoogleAuth

const LoginFunction = ({ loginPropInput }) => {
    const { form, options } = loginPropInput;
    const navigate = useNavigate();
    const [error, setError] = useState(''); // State to track login errors

    // Handle traditional login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error messages

        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData.entries());

        try {
            const response = await apiClient.post('/login', payload);
            const { token } = response.data;
            localStorage.setItem('token', token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your credentials.');
        }
    };

    // Handle Google sign-in success
    const handleSuccess = async (response) => {
        try {
            // Send the credential to the backend
            const res = await fetch('http://localhost:5000/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: response.credential }), // Pass Google token
            });

            // Handle the response from the backend
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                console.error('Login failed:', data.message);
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Login failed. Please try again.');
        }
    };

    // Handle Google sign-in failure
    const handleError = (error) => {
        console.error('Login Failed:', error);
        setError('Google Sign-In failed. Please try again.');
    };

    return (
        <div className="login-container">
            {/* Traditional login form */}
            <form onSubmit={handleLogin}>
                {form.inputs.map((input, index) => (
                    <div className="input-group" key={index}>
                        <input
                            type={input.type}
                            id={input.id}
                            placeholder={input.placeholder}
                            name={input.name}
                            required={input.required}
                        />
                    </div>
                ))}
                <button type={form.submitButton.type} className={form.submitButton.className}>
                    {form.submitButton.text}
                </button>
            </form>

            {/* Options (e.g., forgot password, register link) */}
            <div className="options">
                {options.map((option, index) => (
                    <Link key={index} to={option.href} className={option.className}>
                        {option.text}
                    </Link>
                ))}
            </div>

            {/* Google Sign-In Button */}
            <div className="google-auth-container">
                <GoogleAuth onSuccess={handleSuccess} onError={handleError} />
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default LoginFunction;
