    import React, { useEffect } from 'react';

    const Notification = ({ message, type = 'info', onClose, duration = 5000 }) => {
    useEffect(() => {
        if (duration) {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const typeStyles = {
        success: 'bg-green-500 border-green-600',
        error: 'bg-red-500 border-red-600',
        warning: 'bg-yellow-500 border-yellow-600',
        info: 'bg-blue-500 border-blue-600'
    };

    return (
        <div className={`fixed top-4 right-4 z-50 text-white px-6 py-4 rounded-lg border backdrop-blur-md transform transition-transform duration-300 ${typeStyles[type]}`}>
        <div className="flex items-center space-x-3">
            <span className="text-lg">
            {type === 'success' && '✅'}
            {type === 'error' && '❌'}
            {type === 'warning' && '⚠️'}
            {type === 'info' && 'ℹ️'}
            </span>
            <span className="font-medium">{message}</span>
            <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
            >
            ✕
            </button>
        </div>
        </div>
    );
    };

    export default Notification;