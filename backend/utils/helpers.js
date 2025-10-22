    // Utility functions

    // Password validation
    export const validatePassword = (password) => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    return {
        isValid: password.length >= minLength && hasLowerCase && hasUpperCase && hasNumbers,
        requirements: {
        minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers
        }
    };
    };

    // Email validation
    export const validateEmail = (email) => {
    return validator.isEmail(email);
    };

    // Generate random string for tokens
    export const generateRandomString = (length = 32) => {
    return [...Array(length)].map(() => 
        Math.random().toString(36)[2]
    ).join('');
    };

    // Sanitize user input
    export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    return validator.escape(validator.trim(input));
    };