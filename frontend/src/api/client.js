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


        if (!cfg) {
            return Promise.reject(error);
        }

        const status = error.response?.status;
        if (status !== 401) {
            return Promise.reject(error);
        }

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

        if (isAuthEndpoint || cfg._retry) {
            return Promise.reject(error);
        }

        cfg._retry = true;

        if (refreshing) {
            return new Promise((resolve, reject) => {
                queue.push({ resolve, reject });
            }).then(() => api(cfg));
        }

        refreshing = true;

        try {
            await api.post('/auth/refresh');
            flush();

            return await api(cfg);
        } catch (refreshError) {

            flush(refreshError);

            return Promise.reject(refreshError);
        } finally {
            refreshing = false;
        }
    }
);

export default api;