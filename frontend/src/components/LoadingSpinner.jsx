    import React from 'react';

    const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
    const sizeClasses = {
        small: 'w-6 h-6',
        medium: 'w-12 h-12',
        large: 'w-16 h-16'
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
        <div className={`${sizeClasses[size]} border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin`}></div>
        {text && <p className="text-gray-600 dark:text-gray-400 font-medium">{text}</p>}
        </div>
    );
    };

    export default LoadingSpinner;