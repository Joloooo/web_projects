import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Import Font Awesome or a similar icon library
import apiClient from '../ApiClient'; // Your Axios client
import './Authentication.css';

const PasswordRecovery = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token'); // Extract the reset token from the URL
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await apiClient.post('/forgot-password', { email });
            setMessage('A recovery link has been sent to your email.');
        } catch (err) {
            setError('Failed to send recovery email. Please check your email address and try again.');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        if (newPassword !== repeatPassword) {
            setError('Passwords do not match!');
            return;
        }
        try {
            // Reset the password
            const resetResponse = await apiClient.post('/reset-password', { token, newPassword });
    
            if (resetResponse.status === 200) {
                const { email } = resetResponse.data; // Extract email from the response
    
                console.log('Reset successful, attempting login with:', { identifier: email, password: newPassword });
    
                // Attempt to log in the user immediately after password reset
                const loginResponse = await apiClient.post('/login', { identifier: email, password: newPassword });
    
                if (loginResponse.status === 200) {
                    const { token } = loginResponse.data;
                    localStorage.setItem('token', token); // Store the JWT in local storage
                    navigate('/dashboard'); // Redirect to the dashboard or home page
                } else {
                    setMessage('Password reset successful, but automatic login failed. Please log in manually.');
                }
            } else {
                setError('Failed to reset password. Please try again.');
            }
        } catch (err) {
            console.error('Error during reset:', err.response?.data || err);
            setError('Failed to reset password. Please try again.');
        }
    };

    return (
        <div className="password-recovery-container">
            {/* Header with Back Icon */}
            <div className="back-button-and-heading">
                <FaArrowLeft className='back-icon' onClick={() => navigate(-1)}/>
                <h3>Forgot Your Password?</h3>
                <span></span>
            </div>

            {!token ? (
                // Forgot Password Form
                <>
                    <p>Enter your email address to receive a recovery link.</p>
                    <form onSubmit={handleForgotPassword}>
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn">
                            Send Recovery Email
                        </button>
                    </form>
                </>
            ) : (
                // Reset Password Form
                <>
                    <p>Enter your new password below.</p>
                    <form onSubmit={handleResetPassword}>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Repeat New Password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn">
                            Reset Password
                        </button>
                    </form>
                </>
            )}
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default PasswordRecovery;
