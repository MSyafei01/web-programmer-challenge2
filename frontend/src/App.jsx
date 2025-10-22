    import React from 'react';
    import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
    import { AuthProvider, useAuth } from './context/AuthContext';
    import Login from './pages/Login';
    import Dashboard from './pages/Dashboard';
    import LoadingSpinner from './components/LoadingSpinner';

    const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
        return (
        <div className="min-h-screen bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center">
            <LoadingSpinner size="large" text="Checking authentication..." />
        </div>
        );
    }
    
    return isAuthenticated ? children : <Navigate to="/login" />;
    };

    function App() {
    return (
        <AuthProvider>
        <Router>
            <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
                path="/dashboard" 
                element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
                } 
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
        </Router>
        </AuthProvider>
    );
    }

    export default App;