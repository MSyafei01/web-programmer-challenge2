    import React, { useEffect, useState } from 'react';

    const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check system preference or saved theme
        const isDark = localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        setDarkMode(isDark);
        updateTheme(isDark);
    }, []);

    const updateTheme = (isDark) => {
        if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        }
    };

    const toggleTheme = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        updateTheme(newDarkMode);
    };

    return (
        <button
        onClick={toggleTheme}
        className="p-3 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-105"
        aria-label="Toggle theme"
        >
        {darkMode ? (
            <div className="flex items-center space-x-2">
            <span className="text-xl">🌙</span>
            <span className="text-sm font-medium text-white">Dark</span>
            </div>
        ) : (
            <div className="flex items-center space-x-2">
            <span className="text-xl">☀️</span>
            <span className="text-sm font-medium text-gray-800">Light</span>
            </div>
        )}
        </button>
    );
    };

    export default ThemeToggle;