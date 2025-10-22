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
        {/* Header - Fixed for Mobile */}
        <header className="glass-effect border-b border-white/20 backdrop-blur-md sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 space-y-3 sm:space-y-0">
                {/* Company Info */}
                <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white font-bold text-sm sm:text-lg">JT</span>
                </div>
                <div className="min-w-0">
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                    Dashboard
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                    PT. Javis Teknologi Albarokah
                    </p>
                </div>
                </div>
                
                {/* Time & Controls */}
                <div className="flex items-center justify-between sm:justify-end space-x-4">
                {/* Time - Hidden on very small screens */}
                <div className="hidden xs:block text-xs text-gray-500 dark:text-gray-400 text-right">
                    <div className="whitespace-nowrap">{currentTime.toLocaleDateString('id-ID')}</div>
                    <div className="whitespace-nowrap">{currentTime.toLocaleTimeString('id-ID')}</div>
                </div>
                
                <div className="flex items-center space-x-2">
                    <ThemeToggle />
                    <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors duration-200 font-medium text-sm sm:text-base whitespace-nowrap"
                    >
                    Logout
                    </button>
                </div>
                </div>
            </div>
            </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Welcome Card */}
            <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 cyber-glow backdrop-blur-md">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome back, {user?.username}! 👋
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                You have successfully authenticated to the Web Programmer Challenge system.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Last login: {currentTime.toLocaleString('id-ID')}
            </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-md hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    {stat.title}
                    </h3>
                    <span className="text-xl sm:text-2xl">{stat.icon}</span>
                </div>
                <p className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    {stat.description}
                </p>
                </div>
            ))}
            </div>

            {/* User Info & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* User Information */}
            <div className="glass-effect rounded-2xl p-6 sm:p-8 backdrop-blur-md">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                User Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Username
                    </label>
                    <p className="text-base sm:text-lg text-gray-900 dark:text-white font-semibold truncate">
                    {user?.username}
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Email
                    </label>
                    <p className="text-base sm:text-lg text-gray-900 dark:text-white font-semibold truncate">
                    {user?.email}
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    User ID
                    </label>
                    <p className="text-base sm:text-lg text-gray-900 dark:text-white font-semibold">
                    #{user?.id}
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Authentication
                    </label>
                    <p className="text-base sm:text-lg text-green-500 font-semibold flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Verified ✓
                    </p>
                </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-effect rounded-2xl p-6 sm:p-8 backdrop-blur-md">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <button className="p-3 sm:p-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors duration-200 font-medium text-sm sm:text-base">
                    Profile
                </button>
                <button className="p-3 sm:p-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors duration-200 font-medium text-sm sm:text-base">
                    Security
                </button>
                <button className="p-3 sm:p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors duration-200 font-medium text-sm sm:text-base">
                    Settings
                </button>
                <button className="p-3 sm:p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors duration-200 font-medium text-sm sm:text-base">
                    Support
                </button>
                </div>
            </div>
            </div>
        </main>
        </div>
    );
    };

    export default Dashboard;