    import express from 'express';
    import cors from 'cors';
    import cookieParser from 'cookie-parser';
    import helmet from 'helmet';
    import dotenv from 'dotenv';

    // Routes
    import authRoutes from './routes/auth.js';
    import dashboardRoutes from './routes/dashboard.js';

    // Database
    import { connectDB } from './config/database.js';

    // Load environment variables
    dotenv.config();

    const app = express();

    // Security Middleware
    app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
    }));

    // CORS Configuration - UPDATED FOR PRODUCTION
    app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://*.up.railway.app', // Railway domains
        process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
    }));

    // Middleware
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Database Connection
    connectDB();

    // Debug middleware - log semua request (disable di production untuk performance)
    if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
        next();
    });
    }

    // Routes dengan debug
    console.log('Setting up routes...');
    app.use('/api/auth', authRoutes);
    console.log('✅ Auth routes mounted at /api/auth');

    app.use('/api/dashboard', dashboardRoutes);
    console.log('✅ Dashboard routes mounted at /api/dashboard');

    // Health Check
    app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Web Programmer Challenge API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0'
    });
    });

    // Root endpoint
    app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Web Programmer Challenge API - PT. Javis Teknologi Albarokah',
        version: '1.0.0',
        endpoints: {
        health: '/api/health',
        login: '/api/auth/login',
        dashboard: '/api/dashboard',
        documentation: 'https://github.com/your-repo/docs'
        }
    });
    });

    // 404 Handler dengan detail routes
    app.use('*', (req, res) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`404 - Route not found: ${req.originalUrl}`);
    }
    
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl,
        availableRoutes: [
        'GET  /',
        'GET  /api/health',
        'POST /api/auth/login',
        'POST /api/auth/logout',
        'GET  /api/auth/verify',
        'GET  /api/dashboard'
        ]
    });
    });

    // Global Error Handler
    app.use((error, req, res, next) => {
    console.error('Global Error Handler:', error);
    
    // Jangan expose detailed error di production
    const errorMessage = process.env.NODE_ENV === 'production' 
        ? 'Something went wrong' 
        : error.message;
        
    res.status(500).json({
        error: 'Internal server error',
        message: errorMessage
    });
    });

    // Server Configuration
    const PORT = process.env.PORT || 5000;
    const HOST = process.env.HOST || '0.0.0.0';

    app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running on http://${HOST}:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://${HOST}:${PORT}/api/health`);
    console.log(`🔐 Login: http://${HOST}:${PORT}/api/auth/login`);
    
    // Additional info untuk production
    if (process.env.NODE_ENV === 'production') {
        console.log('✅ Production mode enabled');
        console.log('🔒 Security features active');
    }
    });