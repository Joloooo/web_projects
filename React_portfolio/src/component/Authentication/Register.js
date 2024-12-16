import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Authentication.css';
import apiClient from '../ApiClient'; // Centralized Axios client

const RegisterFunction = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form's default submission
        setError(null);
        setSuccess(null);

        const formData = new FormData(e.target); // Gather form data
        const payload = Object.fromEntries(formData.entries()); // Convert to JSON-friendly object

        try {
            // Step 1: Register the user
            const registrationResponse = await apiClient.post('/register', payload);
            setSuccess('Registration successful! Logging you in...');

            // Step 2: Automatically log the user in
            const loginResponse = await apiClient.post('/login', {
                identifier: payload.username || payload.email, // Use the username or email
                password: payload.password, // Use the password provided during registration
            });

            // Step 3: Save the JWT token in local storage
            const { token } = loginResponse.data;
            localStorage.setItem('token', token);

            // Step 4: Redirect to the dashboard
            navigate('/dashboard');
        } catch (err) {
            // Handle error
            const errorMessage = err.response?.data?.message || 'Something went wrong.';
            setError(errorMessage);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                {/* First and Last Name */}
                <div className="input-group-row">
                    <div className="input-group input-field">
                        <input
                            type="text"
                            id="first-name"
                            placeholder="First Name"
                            name="firstName"
                            required
                        />
                    </div>
                    <div className="input-group input-field">
                        <input
                            type="text"
                            id="last-name"
                            placeholder="Last Name"
                            name="lastName"
                            required
                        />
                    </div>
                </div>

                {/* Birthdate and Gender */}
                <div className="input-group-row">
                    <div className="input-group input-field">
                        <input
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            required
                        />
                    </div>
                    <div className="input-group input-field">
                        <input
                            type="text"
                            id="gender"
                            placeholder="Gender"
                            name="gender"
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="input-group">
                    <div className="input-field">
                        <input
                            type="email"
                            id="new-email"
                            placeholder="Email"
                            name="email"
                            required
                        />
                    </div>
                </div>

                {/* Mobile Number */}
                <div className="input-group">
                    <div className="input-field">
                        <input
                            type="tel"
                            id="mobile"
                            placeholder="Mobile Number"
                            name="mobile"
                            required
                        />
                    </div>
                </div>

                {/* Username and Password */}
                <div className="input-group-row">
                    <div className="input-group input-field">
                        <input
                            type="text"
                            id="new-username"
                            placeholder="Username"
                            name="username"
                            required
                        />
                    </div>
                    <div className="input-group input-field">
                        <input
                            type="password"
                            id="new-password"
                            placeholder="Password"
                            name="password"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="register-btn">
                    Register
                </button>
            </form>

            {/* Error message */}
            {error && <div className="error-message">{error}</div>}

            {/* Success message */}
            {success && <div className="success-message">{success}</div>}

            {/* Options */}
            <div className="options">
                <a href="/login" className="login-account">
                    Already have an account?
                </a>
            </div>
        </div>
    );
};

export default RegisterFunction;
