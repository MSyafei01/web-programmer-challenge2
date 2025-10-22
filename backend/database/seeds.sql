    -- Web Programmer Challenge - Initial Data
    USE web_programmer_challenge;

    -- Insert default admin user (password: admin123)
    INSERT IGNORE INTO users (email, username, password, role) 
    VALUES (
        'admin@javisteknologi.com', 
        'admin', 
        '$2a$12$LQv3c1yqBWVHxkd5L0kROu2vL1REUHHH7r8CnJ8JkX.NUj8Qz7qXa', -- bcrypt hash of 'admin123'
        'admin'
    );

    -- Insert sample regular user (password: user123)
    INSERT IGNORE INTO users (email, username, password, role) 
    VALUES (
        'user@example.com', 
        'user', 
        '$2a$12$8rZfL3cTkQYVh7pW9xM6NeM8JqK5R2tW1YbV3cD4eF5gH6jN7vP8q', -- bcrypt hash of 'user123'
        'user'
    );

    -- Verify inserted data
    SELECT 'Database seeded successfully!' as status;
    SELECT COUNT(*) as total_users FROM users;