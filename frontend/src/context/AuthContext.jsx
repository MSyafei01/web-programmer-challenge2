    import React, { createContext, useContext, useState, useEffect } from 'react';

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
        // Simulasi check authentication
        const token = localStorage.getItem('auth_token');
        if (token) {
            setIsAuthenticated(true);
            setUser({ 
            id: 1, 
            username: 'admin', 
            email: 'admin@javisteknologi.com',
            role: 'administrator' 
            });
        }
        } catch (error) {
        console.error('Auth check failed:', error);
        } finally {
        setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
        setLoading(true);
        
        // SIMULASI LOGIN - nanti diganti dengan API call
        if ((email === 'admin@javisteknologi.com' || email === 'admin') && password === 'admin123') {
            const userData = {
            id: 1,
            username: 'admin',
            email: 'admin@javisteknologi.com',
            role: 'administrator'
            };
            
            localStorage.setItem('auth_token', 'simulated_token');
            setIsAuthenticated(true);
            setUser(userData);
            
            return { success: true, data: userData };
        } else {
            return { success: false, error: 'Invalid credentials' };
        }
        } catch (error) {
        return { success: false, error: 'Login failed' };
        } finally {
        setLoading(false);
        }
    };

    const logout = async () => {
        localStorage.removeItem('auth_token');
        setIsAuthenticated(false);
        setUser(null);
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