import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Configure Axios instance with CORS headers
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

const userService = {
    // Get all users with optional search filters
    getUsers: async (searchParams = {}) => {
        try {
            const response = await axiosInstance.get('/users', {
                params: searchParams
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    // Get user details by UUID
    getUserById: async (userUid) => {
        try {
            const response = await axiosInstance.get(`/users/${userUid}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching user ${userUid}:`, error);
            throw error;
        }
    },

    // Create a new user
    createUser: async (userData) => {
        try {
            const response = await axiosInstance.post('/users', userData);
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    // Update a user
    updateUser: async (userData) => {
        try {
            const response = await axiosInstance.put('/users', userData);
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    // Delete a user
    deleteUser: async (userUid) => {
        try {
            const response = await axiosInstance.delete(`/users/${userUid}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting user ${userUid}:`, error);
            throw error;
        }
    }
};

export default userService;
