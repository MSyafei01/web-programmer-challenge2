    const express = require('express');
    const router = express.Router();
    const db = require('../config/database');
    const auth = require('../middleware/auth');

    // Get all users (Admin only)
    router.get('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admin only.' });
        }

        const [users] = await db.execute(`
        SELECT id, username, email, role, is_active, created_at 
        FROM users 
        ORDER BY created_at DESC
        `);
        
        res.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Server error' });
    }
    });

    // Create new user (Admin only)
    router.post('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admin only.' });
        }

        const { username, email, password, role = 'user' } = req.body;

        // Validation
        if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if user already exists
        const [existingUser] = await db.execute(
        'SELECT id FROM users WHERE username = ? OR email = ?',
        [username, email]
        );

        if (existingUser.length > 0) {
        return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Hash password
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const [result] = await db.execute(
        'INSERT INTO users (username, email, password, role, is_active) VALUES (?, ?, ?, ?, ?)',
        [username, email, hashedPassword, role, 1]
        );

        res.status(201).json({ 
        message: 'User created successfully',
        user: {
            id: result.insertId,
            username,
            email,
            role,
            is_active: true
        }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
    });

    // Update user (Admin only)
    router.put('/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admin only.' });
        }

        const userId = req.params.id;
        const { username, email, role, is_active } = req.body;

        // Check if user exists
        const [users] = await db.execute('SELECT id FROM users WHERE id = ?', [userId]);
        if (users.length === 0) {
        return res.status(404).json({ error: 'User not found' });
        }

        // Update user
        await db.execute(
        'UPDATE users SET username = ?, email = ?, role = ?, is_active = ? WHERE id = ?',
        [username, email, role, is_active, userId]
        );

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
    });

    // Delete user (Admin only)
    router.delete('/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admin only.' });
        }

        const userId = req.params.id;

        // Prevent admin from deleting themselves
        if (parseInt(userId) === req.user.id) {
        return res.status(400).json({ error: 'Cannot delete your own account' });
        }

        // Check if user exists
        const [users] = await db.execute('SELECT id FROM users WHERE id = ?', [userId]);
        if (users.length === 0) {
        return res.status(404).json({ error: 'User not found' });
        }

        // Delete user
        await db.execute('DELETE FROM users WHERE id = ?', [userId]);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Server error' });
    }
    });

    module.exports = router;