import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getDB } from '../config/database.js';

        const router = express.Router();

    // Protect all dashboard routes
    router.use(authenticateToken);

    // Get dashboard data
    router.get('/', async (req, res) => {
    try {
        const db = getDB();

        // Get user stats (in a real app, you'd have more complex queries)
        const [userStats] = await db.execute(
        'SELECT COUNT(*) as totalUsers FROM users WHERE is_active = TRUE'
        );

        const dashboardData = {
        message: `Welcome to your dashboard, ${req.user.username}!`,
        user: req.user,
        stats: {
            totalUsers: userStats[0].totalUsers,
            activeSessions: Math.floor(Math.random() * 50) + 1, // Simulated data
            uptime: '99.9%',
            systemStatus: 'Operational'
        },
        recentActivity: [
            'User authentication successful',
            'Dashboard accessed',
            'Profile data loaded',
            `Last login: ${new Date().toLocaleString('id-ID')}`
        ],
        quickActions: [
            { name: 'Profile Settings', icon: '👤', available: true },
            { name: 'Security', icon: '🔒', available: true },
            { name: 'Preferences', icon: '⚙️', available: false },
            { name: 'Help & Support', icon: '❓', available: true }
        ]
        };