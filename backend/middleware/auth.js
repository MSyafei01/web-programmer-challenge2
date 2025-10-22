    import jwt from 'jsonwebtoken';

    // JWT Authentication Middleware
    export const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
        return res.status(401).json({ 
            error: 'Access denied. No token provided.' 
        });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user info to request
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ 
            error: 'Token expired. Please login again.' 
        });
        }
        
        if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ 
            error: 'Invalid token.' 
        });
        }

        console.error('Auth middleware error:', error);
        res.status(500).json({ 
        error: 'Authentication failed.' 
        });
    }
    };

    // Rate limiting middleware for login attempts
    export const loginRateLimit = () => {
    const attempts = new Map();
    const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
    const MAX_ATTEMPTS = 5;

    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress;
        const now = Date.now();
        const windowStart = now - WINDOW_MS;

        // Clean old attempts
        if (!attempts.has(ip)) {
        attempts.set(ip, []);
        }

        const ipAttempts = attempts.get(ip).filter(time => time > windowStart);
        attempts.set(ip, ipAttempts);

        // Check if exceeded max attempts
        if (ipAttempts.length >= MAX_ATTEMPTS) {
        return res.status(429).json({
            error: 'Too many login attempts. Please try again in 15 minutes.'
        });
        }

        // Add current attempt
        ipAttempts.push(now);
        next();
    };
    };