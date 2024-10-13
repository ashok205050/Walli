import axios from 'axios';
import authService from './authService'; // Import auth service

const apiService = axios.create({
    baseURL: 'https://walli-django-production.up.railway.app/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to attach the access token to every request
apiService.interceptors.request.use(async (config) => {
    const token = await authService.getAccessToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor to refresh token if access token expires
apiService.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && error.response.data.code === 'token_not_valid') {
        const newToken = await authService.refreshAccessToken();
        if (newToken) {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return apiService(originalRequest); // Retry the request with the new token
        }
    }
    return Promise.reject(error);
});

export default apiService;
