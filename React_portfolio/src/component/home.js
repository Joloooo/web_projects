import React, { useEffect, useState } from 'react';
import apiClient from '../component/ApiClient'; // Use the configured Axios client
import '../App.css';

// Reusable function to check login state
const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; // Return true if token exists, false otherwise
};

const Home = () => {
    const [homeText, setHomeText] = useState(''); // State to hold the dynamic text

    useEffect(() => {
        if (isLoggedIn()) {
            // Fetch dashboard data if logged in
            const fetchDashboardData = async () => {
                try {
                    const response = await apiClient.get('/loggedUserData'); // No need to set Authorization
                    const data = response.data;
                    setHomeText(`Hi ${data.firstName}! Welcome to Jolocorp`);
                } catch (err) {
                    console.error('Error:', err.message);
                    setHomeText('Error loading dashboard data.');
                }
            };

            fetchDashboardData();
        } else {
            // Set text for non-logged-in users
            setHomeText('Welcome to the home page!');
        }
    }, []); // Runs only on initial render

    return (
        <section className="welcome-section" id="welcome-section">
            <h1>{homeText}</h1>
        </section>
    );
};

export default Home;
