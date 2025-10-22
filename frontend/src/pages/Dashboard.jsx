    import React, { useState, useEffect } from 'react';
    import { useAuth } from '../context/AuthContext';
    import ThemeToggle from '../components/ThemeToggle';

    const Dashboard = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const { user, logout } = useAuth();

    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleLogout = () => {
        logout();
    };

    // Stats data
    const stats = [
        { 
        title: 'System Status', 
        value: 'Online', 
        color: 'text-green-500',
        description: 'All systems operational',
        icon: '🟢'
        },
        { 
        title: 'User Role', 
        value: user?.role || 'User', 
        color: 'text-primary-500',
        description: 'Administrative access',
        icon: '👨‍💼'
        },
        { 
        title: 'Session', 
        value: 'Active', 
        color: 'text-cyan-500',
        description: 'Secure connection',
        icon: '🔒'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        {/* Header */}
        <header className="glass-effect border-b border-white/20 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
                <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">JT</span>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Dashboard
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                    PT. Javis Teknologi Albarokah
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <div>{currentTime.toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}</div>
                    <div>{currentTime.toLocaleTimeString('id-ID')}</div>
                    </div>
                </div>
                </div>
                
                <div className="flex items-center space-x-4">
                <ThemeToggle />
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
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
            <div className="glass-effect rounded-2xl p-8 mb-8 cyber-glow backdrop-blur-md">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome back, {user?.username}! 👋
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
                You have successfully authenticated to the Web Programmer Challenge system.
                Last login: {currentTime.toLocaleString('id-ID')}
            </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="glass-effect rounded-2xl p-6 backdrop-blur-md hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {stat.title}
                    </h3>
                    <span className="text-2xl">{stat.icon}</span>
                </div>
                <p className={`text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {stat.description}
                </p>
                </div>
            ))}
            </div>

            {/* User Info & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Information */}
            <div className="glass-effect rounded-2xl p-8 backdrop-blur-md">
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
                    <p className="text-lg text-green-500 font-semibold flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Verified ✓
                    </p>
                </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-effect rounded-2xl p-8 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors duration-200 font-medium">
                    Profile Settings
                </button>
                <button className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors duration-200 font-medium">
                    Security
                </button>
                <button className="p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors duration-200 font-medium">
                    Preferences
                </button>
                <button className="p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors duration-200 font-medium">
                    Help & Support
                </button>
                </div>
            </div>
            </div>
        </main>
        </div>
    );
    };

    export default Dashboard;