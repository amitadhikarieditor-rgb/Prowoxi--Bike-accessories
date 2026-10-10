import axios from 'axios';

const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        'http://localhost:5000/api',
    withCredentials: true,
});

let refreshing = false;
let queue = [];

function flush(error = null) {
    queue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve();
        }
    });

    queue = [];
}

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const cfg = error.config;

        // Request config unavailable
        if (!cfg) {
            return Promise.reject(error);
        }

        const status = error.response?.status;

        // Only handle unauthorized responses
        if (status !== 401) {
            return Promise.reject(error);
        }

        // Never refresh auth endpoints
        const excludedUrls = [
            '/auth/login',
            '/auth/register',
            '/auth/refresh',
            '/auth/logout',
        ];

        const requestUrl = cfg.url || '';

        const isAuthEndpoint = excludedUrls.some(
            (url) =>
                requestUrl === url ||
                requestUrl.endsWith(url)
        );

        // Prevent retry loops
        if (isAuthEndpoint || cfg._retry) {
            return Promise.reject(error);
        }

        cfg._retry = true;

        // If refresh is already running, wait for it
        if (refreshing) {
            return new Promise((resolve, reject) => {
                queue.push({ resolve, reject });
            }).then(() => api(cfg));
        }

        refreshing = true;

        try {
            // Refresh the access token using the refresh cookie
            await api.post('/auth/refresh');

            // Retry requests waiting in the queue
            flush();

            // Retry the original request
            return await api(cfg);
        } catch (refreshError) {
            // Reject queued requests if refresh fails
            flush(refreshError);

            return Promise.reject(refreshError);
        } finally {
            refreshing = false;
        }
    }
);

export default api;