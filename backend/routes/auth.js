import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { getDB } from '../config/database.js';
import { loginRateLimit } from '../middleware/auth.js';

const router = express.Router();
// Apply rate limiting to auth routes
router.use(loginRateLimit());

// Login endpoint
    router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
        return res.status(400).json({ 
            error: 'Email/username and password are required' 
        });
        }

        if (email.includes('@') && !validator.isEmail(email)) {
        return res.status(400).json({ 
            error: 'Please enter a valid email address' 
        });
        }

        if (password.length < 6) {
        return res.status(400).json({ 
            error: 'Password must be at least 6 characters' 
        });
        }
    const db = getDB();

        // Find user by email or username
        const [users] = await db.execute(
        `SELECT * FROM users 
        WHERE (email = ? OR username = ?) AND is_active = TRUE`,
        [email, email]
        );

        if (users.length === 0) {
        return res.status(401).json({ 
            error: 'Invalid email/username or password' 
        });
        }

        const user = users[0];

        // Check if account is locked due to too many attempts
        if (user.login_attempts >= 5) {
        return res.status(423).json({
            error: 'Account temporarily locked due to too many failed attempts'
        });
        }

