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