    import React from 'react';

    const UserList = ({ users, onEdit, onDelete, currentUserId }) => {
    const getRoleBadge = (role) => {
        const roleStyles = {
        admin: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        user: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        };
        
        return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleStyles[role]}`}>
            {role}
        </span>
        );
    };

    const getStatusBadge = (isActive) => {
        return isActive ? (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Active
        </span>
        ) : (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
            Inactive
        </span>
        );
    };

    return (
        <div className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {users.map((user) => (
            <div key={user.id} className="glass-effect rounded-xl p-4 backdrop-blur-md border border-white/10 hover:border-primary-500/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                    {user.username}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {user.email}
                    </p>
                </div>
                <div className="flex space-x-1">
                    {getRoleBadge(user.role)}
                    {getStatusBadge(user.is_active)}
                </div>
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                <div>ID: #{user.id}</div>
                <div>Joined: {new Date(user.created_at).toLocaleDateString('id-ID')}</div>
                </div>

                <div className="flex space-x-2">
                <button
                    onClick={() => onEdit(user)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(user.id)}
                    disabled={user.id === currentUserId}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    user.id === currentUserId
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                    title={user.id === currentUserId ? "Cannot delete your own account" : "Delete user"}
                >
                    Delete
                </button>
                </div>
            </div>
            ))}
        </div>

        {users.length === 0 && (
            <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">👥</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No users found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
                Get started by creating your first user
            </p>
            </div>
        )}
        </div>
    );
    };

    export default UserList;