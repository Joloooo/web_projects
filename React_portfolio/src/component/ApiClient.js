import axios from 'axios';
import API_BASE_URL from '../config';

const apiClient = axios.create({
    baseURL: `${API_BASE_URL}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Automatically include token in request headers
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        //console.log('Using token:', token); // Debug token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let logoutInProgress = false; // Global flag to prevent multiple logouts

apiClient.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => {
        if (error.response?.status === 401) {
            const message = error.response.data?.message;
            if (message === 'TokenExpiredError' && !logoutInProgress) {
                logoutInProgress = true; // Set the flag
                localStorage.removeItem('token'); // Clear token
                alert('Your session has expired. Please log in again.');
                window.location.href = '/login'; // Redirect to login page
            }
        }
        return Promise.reject(error); // Always propagate errors
    }
);

export default apiClient;
