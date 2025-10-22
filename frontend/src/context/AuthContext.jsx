    import React, { createContext, useContext, useState, useEffect } from 'react';
    import axios from 'axios';

    const AuthContext = createContext();

    export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
    };

    export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configure axios untuk connect ke backend
    axios.defaults.baseURL = 'http://localhost:5000/api';
    axios.defaults.withCredentials = true; // Penting untuk HttpOnly cookies

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
        console.log('🔐 Checking authentication...');
        const response = await axios.get('/auth/verify');
        
        if (response.data.authenticated) {
            console.log('✅ User authenticated:', response.data.user);
            setIsAuthenticated(true);
            setUser(response.data.user);
        } else {
            console.log('❌ User not authenticated');
            setIsAuthenticated(false);
            setUser(null);
        }
        } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        setUser(null);
        } finally {
        setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {

        setLoading(true);
        console.log('🔐 Attempting login...', { email });
        
        const response = await axios.post('/auth/login', { 
            email, 
            password 
        });
        
        console.log('✅ Login response:', response.data);

        if (response.data.success) {
            setIsAuthenticated(true);
            setUser(response.data.user);
            return { success: true, data: response.data };
        }

        } catch (error) {
        console.error('❌ Login error:', error);
                // Handle countdown timer dari backend
        if (error.response?.status === 429) {
        const retryAfter = error.response.data.retryAfter;
        const message = error.response.data.message || `Too many attempts. Try again in ${retryAfter} seconds.`;
        
        return { 
            success: false, 
            error: message,
            retryAfter: retryAfter,
            isRateLimited: true
        };
        }
        const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
        
        return { success: false, error: errorMessage };
        } finally {
        setLoading(false);
        }
    };

    const logout = async () => {
        try {
        console.log('🚪 Logging out...');
        await axios.post('/auth/logout');
        } catch (error) {
        console.error('Logout error:', error);
        } finally {
        setIsAuthenticated(false);
        setUser(null);
        console.log('✅ Logout successful');
        }
    };

    const value = {
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        checkAuth
    };

    return (
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    );
    };