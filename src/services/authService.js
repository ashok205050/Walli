import axios from 'axios';

const authService = {
    getAccessToken: () => localStorage.getItem('access_token'),

    refreshAccessToken: async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) throw new Error('No refresh token available');

        try {
            const response = await axios.post('https://walli-django-production.up.railway.app/api/token/refresh/', {
                refresh: refreshToken,
            });
            localStorage.setItem('access_token', response.data.access); // Store new access token
            return response.data.access;
        } catch (error) {
            console.error('Token refresh failed:', error);
            return null;
        }
    },

    // Add login/logout functions here if needed
};

export default authService;
