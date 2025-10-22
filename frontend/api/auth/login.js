    import bcrypt from 'bcryptjs';
    import jwt from 'jsonwebtoken';
    import validator from 'validator';

    // Simpan ini di environment variables Vercel
    const JWT_SECRET = process.env.JWT_SECRET;

    // Simple in-memory store untuk demo (ganti dengan database di production)
    const users = [
    {
        id: 1,
        email: 'admin@javisteknologi.com',
        username: 'admin',
        password: '$2a$12$LQv3c1yqBWVHxkd5L0kROu2vL1REUHHH7r8CnJ8JkX.NUj8Qz7qXa', // admin123
        role: 'admin'
    }
    ];

    export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
        return res.status(400).json({ 
            error: 'Email/username and password are required' 
        });
        }

        // Find user
        const user = users.find(u => 
        u.email === email || u.username === email
        );

        if (!user) {
        return res.status(401).json({ 
            error: 'Invalid email/username or password' 
        });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
        return res.status(401).json({ 
            error: 'Invalid email/username or password' 
        });
        }

        // Generate JWT token
        const token = jwt.sign(
        { 
            userId: user.id, 
            email: user.email, 
            username: user.username,
            role: user.role 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
        );

        // Set HTTP-only cookie
        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);

        // Return user data (without password)
        const userResponse = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
        };

        res.status(200).json({
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
    }