    import React, { useState, useEffect } from 'react';

    const UserForm = ({ user, onClose, onSuccess, onError }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user',
        is_active: true
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
        setFormData({
            username: user.username || '',
            email: user.email || '',
            password: '',
            role: user.role || 'user',
            is_active: user.is_active
        });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
        const token = localStorage.getItem('token');
        const url = user 
            ? `http://localhost:5000/api/users/${user.id}`
            : 'http://localhost:5000/api/users';
        
        const method = user ? 'PUT' : 'POST';

        // Remove password if empty for updates
        const submitData = user && !formData.password 
            ? { ...formData, password: undefined }
            : formData;

        const response = await fetch(url, {
            method,
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitData)
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to save user');
        }

        onSuccess();
        } catch (error) {
        onError(error.message);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="glass-effect rounded-2xl p-6 w-full max-w-md backdrop-blur-md border border-white/20">
            <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {user ? 'Edit User' : 'Create New User'}
            </h2>
            <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
                ✕
            </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username *
                </label>
                <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email *
                </label>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password {user ? '(leave empty to keep current)' : '*'}
                </label>
                <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required={!user}
                minLength="6"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role
                </label>
                <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                </select>
            </div>

            <div className="flex items-center">
                <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Active User
                </label>
            </div>

            <div className="flex space-x-3 pt-4">
                <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
                >
                Cancel
                </button>
                <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium disabled:opacity-50"
                >
                {loading ? 'Saving...' : (user ? 'Update' : 'Create')}
                </button>
            </div>
            </form>
        </div>
        </div>
    );
    };

    export default UserForm;