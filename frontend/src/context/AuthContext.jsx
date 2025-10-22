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

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        console.log('checkAuth - Token exists:', !!token, 'User data exists:', !!userData);
        
        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
            console.log('checkAuth - User authenticated:', JSON.parse(userData));
        } else {
            console.log('checkAuth - No auth data found');
        }
        } catch (error) {
        console.error('Auth check failed:', error);
        } finally {
        setLoading(false);
        console.log('checkAuth - Loading set to false');
        }
    };

    const login = async (email, password) => {
        try {
        setLoading(true);
        console.log('login - Starting login for:', email);
        
        // Simulasi API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if ((email === 'admin@javisteknologi.com' || email === 'admin') && password === 'admin123') {
            const userData = {
            id: 1,
            username: 'admin',
            email: 'admin@javisteknologi.com',
            role: 'administrator'
            };
            
            // Simpan ke localStorage
            localStorage.setItem('auth_token', 'simulated_jwt_token_12345');
            localStorage.setItem('user_data', JSON.stringify(userData));
            
            // Update state - INI YANG PENTING!
            setIsAuthenticated(true);
            setUser(userData);
            
            console.log('login - SUCCESS, user authenticated:', userData);
            return { success: true, data: userData };
        } else {
            console.log('login - FAILED: Invalid credentials');
            return { success: false, error: 'Invalid email/username or password' };
        }
        } catch (error) {
        console.error('login - ERROR:', error);
        return { success: false, error: 'Login failed. Please try again.' };
        } finally {
        setLoading(false);
        console.log('login - Loading set to false');
        }
    };

    const logout = async () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        setIsAuthenticated(false);
        setUser(null);
        console.log('logout - User logged out');
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