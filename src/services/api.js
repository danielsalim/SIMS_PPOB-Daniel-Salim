import axios from 'axios';

const API_URL = 'https://take-home-test-api.nutech-integrasi.com/';

/**
 * Function to login a user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise} - Resolves with API response or rejects with error.
 */
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}login`, { email, password });
        return response.data; // Return the API response
    } catch (error) {
        throw error.response?.data || error.message; // Throw error details
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/registration`, userData);
        return response.data; // Return the full response data
    } catch (error) {
        if (error.response) {
            return { error: error.response.data.message || 'Registration failed' };
        }
        return { error: 'Network error or server unavailable' };
    }
};

export const submitTopUp = async (topUpAmount, token) => {
    try {
        const response = await axios.post(
            `${API_URL}/topup`,
            { top_up_amount: topUpAmount }, // Send the top-up amount in the required format
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the headers for authentication
                },
            }
        );
        return response.data; // Return the full response data
    } catch (error) {
        if (error.response) {
            return { error: error.response.data.message || 'Top-up failed' }; // Handle API errors
        }
        return { error: 'Network error or server unavailable' }; // Handle network/server errors
    }
};

export const fetchData = async (endpoint, token) => {
    try {
        const response = await axios.get(`${API_URL}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Return the response data
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch data.');
    }
};