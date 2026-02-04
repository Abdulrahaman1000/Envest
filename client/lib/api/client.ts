import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'https://envest.live/qSdb89lP/';
const TOKEN_KEY = 'envest_auth_token';
const USER_KEY = 'envest_user_session';

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper to check internet connectivity
const checkOnlineStatus = () => {
    if (!navigator.onLine) {
        throw new Error('No internet connection. Please check your network settings.');
    }
};

// Request Interceptor
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        checkOnlineStatus();

        // Token Injection
        const token = localStorage.getItem(TOKEN_KEY);
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Handle array response based on Postman collection observation
        const responseData = Array.isArray(response.data) ? response.data[0] : response.data;

        // Token Extraction
        // Based on the provided example response: { code: 200, status: true, message: "Login successful", data: { token: "...", ... } }
        if (responseData?.data?.token) {
            localStorage.setItem(TOKEN_KEY, responseData.data.token);
        }

        // Return the processed data or the original response data
        return responseData;
    },
    (error: AxiosError) => {
        // Handle 401 Error
        if (error.response && error.response.status === 401) {
            // Clear storage and redirect to login if needed
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            // Ideally we would redirect here, but doing it in an interceptor might be tricky without a router context. 
            // Usually we return the error and let the app handle it, or use window.location.href (but that forces reload).
            // For now, assume the app's auth state management will handle logout on API failure if we clear storage or throw specific error.
        }

        return Promise.reject(error);
    }
);

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export const apiClient = async <T = any>(
    method: HttpMethod,
    endpoint: string,
    payload?: any
): Promise<T> => {
    try {
        const response = await instance.request<T>({
            method,
            url: endpoint,
            data: payload,
        });
        return response as T;
    } catch (error) {
        // Re-throw the error so React Query can catch it
        throw error;
    }
};

export default apiClient;
