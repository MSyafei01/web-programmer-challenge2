    import React, { useState, useEffect } from 'react';
    import { useAuth } from '../context/AuthContext';
    import UserList from '../components/UserList';
    import UserForm from '../components/UserForm';
    import ThemeToggle from '../components/ThemeToggle';

    const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        if (user?.role === 'admin') {
        fetchUsers();
        }
    }, [user]);

    const fetchUsers = async () => {
        try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/users', {
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data.users);
        } catch (error) {
        setError('Error fetching users: ' + error.message);
        } finally {
        setLoading(false);
        }
    };

    const handleCreateUser = () => {
        setEditingUser(null);
        setShowForm(true);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
        return;
        }

        try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to delete user');
        }

        setUsers(users.filter(u => u.id !== userId));
        setSuccess('User deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
        setError('Error deleting user: ' + error.message);
        setTimeout(() => setError(''), 3000);
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingUser(null);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingUser(null);
        fetchUsers();
        setSuccess(editingUser ? 'User updated successfully' : 'User created successfully');
        setTimeout(() => setSuccess(''), 3000);
    };

    if (user?.role !== 'admin') {
        return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
            <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-600 dark:text-gray-400">Admin access required</p>
            </div>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        {/* Header */}
        <header className="glass-effect border-b border-white/20 backdrop-blur-md sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm sm:text-lg">JT</span>
                </div>
                <div>
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    User Management
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    PT. Javis Teknologi Albarokah
                    </p>
                </div>
                </div>
                
                <div className="flex items-center space-x-4">
                <ThemeToggle />
                <button
                    onClick={() => window.history.back()}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                >
                    Back to Dashboard
                </button>
                </div>
            </div>
            </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Alerts */}
            {error && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
            </div>
            )}
            {success && (
            <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                {success}
            </div>
            )}

            {/* Header Card */}
            <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 cyber-glow backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Manage Users
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Create, edit, and manage system users
                </p>
                </div>
                <button
                onClick={handleCreateUser}
                className="mt-4 sm:mt-0 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl transition-colors duration-200 font-medium flex items-center space-x-2"
                >
                <span>+</span>
                <span>Add New User</span>
                </button>
            </div>
            </div>

            {/* Users List */}
            <div className="glass-effect rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            {loading ? (
                <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading users...</p>
                </div>
            ) : (
                <UserList 
                users={users} 
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                currentUserId={user.id}
                />
            )}
            </div>
        </main>

        {/* User Form Modal */}
        {showForm && (
            <UserForm
            user={editingUser}
            onClose={handleFormClose}
            onSuccess={handleFormSuccess}
            onError={setError}
            />
        )}
        </div>
    );
    };

    export default UserManagement;