    -- Reset database for development/testing
    USE web_programmer_challenge;

    -- Disable foreign key checks
    SET FOREIGN_KEY_CHECKS = 0;

    -- Truncate tables
    TRUNCATE TABLE user_sessions;
    TRUNCATE TABLE login_attempts;
    TRUNCATE TABLE users;

    -- Enable foreign key checks
    SET FOREIGN_KEY_CHECKS = 1;

    -- Re-insert default admin user
    INSERT INTO users (email, username, password, role) 
    VALUES (
        'admin@javisteknologi.com', 
        'admin', 
        '$2a$12$LQv3c1yqBWVHxkd5L0kROu2vL1REUHHH7r8CnJ8JkX.NUj8Qz7qXa',
        'admin'
    );

    SELECT 'Database reset successfully!' as status;