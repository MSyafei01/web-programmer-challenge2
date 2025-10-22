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
        // Hitung waktu tersisa untuk unlock
        const [lastAttempt] = await db.execute(
            'SELECT updated_at FROM users WHERE id = ?',
            [user.id]
        );
        
        const lastAttemptTime = new Date(lastAttempt[0].updated_at).getTime();
        const now = Date.now();
        const timeElapsed = now - lastAttemptTime;
        const timeRemaining = Math.ceil((60000 - timeElapsed) / 1000); // 1 menit dalam ms
        
        if (timeRemaining > 0) {
            return res.status(429).json({
            error: 'Account temporarily locked.',
            retryAfter: timeRemaining,
            message: `Too many failed attempts. Try again in ${timeRemaining} seconds.`
            });
        } else {
            // Reset attempts jika waktu sudah habis
            await db.execute(
            'UPDATE users SET login_attempts = 0 WHERE id = ?',
            [user.id]
            );
        }
        }
        
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);


        if (!isPasswordValid) {
        // Increment login attempts
        await db.execute(
            'UPDATE users SET login_attempts = login_attempts + 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [user.id]
        );

        return res.status(401).json({ 
            error: 'Invalid email/username or password' 
        });
        }

        // Reset login attempts on successful login
        await db.execute(
        'UPDATE users SET login_attempts = 0, last_login = CURRENT_TIMESTAMP WHERE id = ?',
        [user.id]
        );

        // Generate JWT token
        const token = jwt.sign(
        { 
            userId: user.id, 
            email: user.email, 
            username: user.username,
            role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
        );

        // Set HTTP-only cookie
        res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Return user data (without password)
        const userResponse = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        lastLogin: user.last_login
        };

        res.json({
        success: true,
        message: 'Login successful',
        user: userResponse
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
        error: 'Internal server error during login' 
        });
    }
    });

    // Logout endpoint
    router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ 
    success: true, 
    message: 'Logout successful' 
    });
    });

    // Verify token endpoint
    router.get('/verify', async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
        return res.json({ 
            authenticated: false 
        });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

            
        // Get fresh user data from database
        const db = getDB();
        const [users] = await db.execute(
        'SELECT id, email, username, role FROM users WHERE id = ? AND is_active = TRUE',
        [decoded.userId]
        );

        if (users.length === 0) {
        res.clearCookie('token');
        return res.json({ 
            authenticated: false 
        });
        }

        res.json({
        authenticated: true,
        user: users[0]
        });

    } catch (error) {
        res.clearCookie('token');
        res.json({ 
        authenticated: false 
        });
    }
    });

    export default router;