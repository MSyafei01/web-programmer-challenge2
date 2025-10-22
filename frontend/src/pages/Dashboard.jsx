    import React, { useState, useEffect } from 'react';
    import { useAuth } from '../context/AuthContext';
    import ThemeToggle from '../components/ThemeToggle';
    

    const Dashboard = () => {
        const [currentTime, setCurrentTime] = useState(new Date());

        useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
        }, []);

    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <header className="glass-effect border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
                <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">JT</span>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Dashboard
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                    PT. Javis Teknologi Albarokah
                    </p>
                </div>
                </div>
                
                <div className="flex items-center space-x-4">
                <ThemeToggle />
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                    Logout
                </button>
                </div>
            </div>
            </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Card */}
            <div className="glass-effect rounded-2xl p-8 mb-8 cyber-glow">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome back, {user?.username}! 👋
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
                You have successfully authenticated to the Web Programmer Challenge system.
            </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="glass-effect rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                System Status
                </h3>
                <p className="text-3xl font-bold text-green-500">Online</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">All systems operational</p>
            </div>
            
            <div className="glass-effect rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                User Role
                </h3>
                <p className="text-3xl font-bold text-primary-500">{user?.role}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Administrative access</p>
            </div>
            
            <div className="glass-effect rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Session
                </h3>
                <p className="text-3xl font-bold text-cyan-500">Active</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Secure connection</p>
            </div>
            </div>

            {/* User Info */}
            <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                User Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Username
                </label>
                <p className="text-lg text-gray-900 dark:text-white font-semibold">
                    {user?.username}
                </p>
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Email
                </label>
                <p className="text-lg text-gray-900 dark:text-white font-semibold">
                    {user?.email}
                </p>
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    User ID
                </label>
                <p className="text-lg text-gray-900 dark:text-white font-semibold">
                    #{user?.id}
                </p>
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Authentication
                </label>
                <p className="text-lg text-green-500 font-semibold">
                    Verified ✓
                </p>
                </div>
            </div>
            </div>
        </main>
        </div>
    );
    };

    export default Dashboard;