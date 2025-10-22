        import mysql from 'mysql2/promise';
        import bcrypt from 'bcryptjs';
        import fs from 'fs';
        import path from 'path';

    // Database configuration
    const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'web_programmer_challenge',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    };

    let pool;

    export const connectDB = async () => {
    try {
        // First, create connection without database to create it if not exists
        const tempConfig = { ...dbConfig };
        delete tempConfig.database;
        
        const tempConnection = await mysql.createConnection(tempConfig);
        
        // Create database if not exists
        await tempConnection.execute(
        `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
        );
        await tempConnection.end();

        // Now connect to the specific database
        pool = mysql.createPool(dbConfig);
        
        // Test connection
        const connection = await pool.getConnection();
        console.log('✅ MySQL Connected successfully');
        connection.release();
        
        // Initialize database tables
        await initializeDatabase();
        
        return pool;
    } catch (error) {
        console.error('❌ MySQL connection failed:', error.message);
        process.exit(1);
    }
    };

    // Initialize database tables
    const initializeDatabase = async () => {
    try {
        // Create users table
        await pool.execute(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            username VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role ENUM('admin', 'user') DEFAULT 'user',
            is_active BOOLEAN DEFAULT TRUE,
            login_attempts INT DEFAULT 0,
            last_login TIMESTAMP NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_email (email),
            INDEX idx_username (username),
            INDEX idx_is_active (is_active)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);

        // Create default admin user if not exists
        const [users] = await pool.execute(
        'SELECT * FROM users WHERE email = ? OR username = ?', 
        ['admin@javisteknologi.com', 'admin']
        );
        
        if (users.length === 0) {
        const hashedPassword = await bcrypt.hash('admin123', 12);
        await pool.execute(
            `INSERT INTO users (email, username, password, role) 
            VALUES (?, ?, ?, ?)`,
            ['admin@javisteknologi.com', 'admin', hashedPassword, 'admin']
        );
        console.log('✅ Default admin user created');
        }

        console.log('✅ Database initialized successfully');

        // Log current users
        const [allUsers] = await pool.execute('SELECT id, email, username, role FROM users');
        console.log(`📊 Current users in database: ${allUsers.length}`);
        allUsers.forEach(user => {
        console.log(`   👤 ${user.username} (${user.email}) - ${user.role}`);
        });

    } catch (error) {
        console.error('❌ Database initialization failed:', error.message);
    }
    };

    // Function to run SQL file (for manual setup)
    export const runSQLFile = async (filePath) => {
    try {
        const sql = fs.readFileSync(filePath, 'utf8');
        const statements = sql.split(';').filter(stmt => stmt.trim());
        
        for (const statement of statements) {
        if (statement.trim()) {
            await pool.execute(statement);
        }
        }
        
        console.log(`✅ SQL file executed: ${path.basename(filePath)}`);
    } catch (error) {
        console.error(`❌ Error executing SQL file: ${error.message}`);
    }
    };

    // Get database pool
    export const getDB = () => {
    if (!pool) {
        throw new Error('Database not initialized. Call connectDB first.');
    }
    return pool;
    };