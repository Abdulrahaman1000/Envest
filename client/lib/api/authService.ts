import mockData from './mockData.json';

const STORAGE_KEY = 'envest_user_session';
const DB_KEY = 'envest_mock_db_users';
const TEMP_SIGNUP_KEY = 'envest_temp_signup';

// Initialize Mock DB in localStorage if empty
const initializeDB = () => {
    const existingDB = localStorage.getItem(DB_KEY);
    if (!existingDB) {
        localStorage.setItem(DB_KEY, JSON.stringify(mockData.users));
    }
};

initializeDB();

export const authService = {
    login: async (credentials: any) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
        const user = users.find(
            (u: any) => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            return user;
        }

        throw new Error('Invalid email or password');
    },

    signUp: async (data: any) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // During sign up, we just hold the data in session storage temporarily
        sessionStorage.setItem(TEMP_SIGNUP_KEY, JSON.stringify(data));
        return data;
    },

    verifyOtp: async (code: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Strict verification for "123456" as requested
        if (code !== '123456') {
            throw new Error('Invalid verification code');
        }
        return true;
    },

    completeProfile: async (profileData: any) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get temp data from the signup step
        const tempData = JSON.parse(sessionStorage.getItem(TEMP_SIGNUP_KEY) || '{}');

        // Create full user object
        const newUser = {
            id: Math.random().toString(36).substr(2, 9),
            ...tempData,
            ...profileData,
            role: 'super_admin',
            permissions: mockData.users[0].permissions, // Grant default permissions
        };

        // Save new user to the Persistent Mock DB
        const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
        users.push(newUser);
        localStorage.setItem(DB_KEY, JSON.stringify(users));

        // Set active session and clear temp data
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
        sessionStorage.removeItem(TEMP_SIGNUP_KEY);

        return newUser;
    },

    getCurrentUser: () => {
        const data = sessionStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    },

    logout: () => {
        sessionStorage.removeItem(STORAGE_KEY);
    }
};
