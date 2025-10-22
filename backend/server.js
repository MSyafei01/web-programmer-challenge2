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

    // CORS Configuration
    app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
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

    // Rate Limiting (Applied to all routes)
    app.use('/api/', (req, res, next) => {
    // Basic rate limiting - will be enhanced in auth routes
    next();
    });

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/dashboard', dashboardRoutes);

    // Health Check
    app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Web Programmer Challenge API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
    });

    // Root endpoint
    app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Web Programmer Challenge API',
        version: '1.0.0',
        documentation: '/api/health'
    });
    });

    // 404 Handler
    app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl
    });
    });

    // Global Error Handler
    app.use((error, req, res, next) => {
    console.error('Global Error Handler:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message
    });
    });

    // Server Configuration
    const PORT = process.env.PORT || 5000;
    const HOST = process.env.HOST || '0.0.0.0';

    app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running on http://${HOST}:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://${HOST}:${PORT}/api/health`);
    });