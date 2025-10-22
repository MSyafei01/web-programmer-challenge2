    // Enhanced rate limiting configuration
    export const createRateLimit = (windowMs = 900000, max = 100, message = 'Too many requests') => {
    const requests = new Map();

    return (req, res, next) => {
        const ip = req.ip;
        const now = Date.now();
        const windowStart = now - windowMs;

        if (!requests.has(ip)) {
        requests.set(ip, []);
        }

        const ipRequests = requests.get(ip).filter(time => time > windowStart);
        requests.set(ip, ipRequests);

        if (ipRequests.length >= max) {
        return res.status(429).json({
            error: message,
            retryAfter: Math.ceil(windowMs / 1000)
        });
        }

        ipRequests.push(now);
        next();
    };
    };

// Specific rate limiters
export const generalRateLimit = createRateLimit(900000, 100, 'Too many requests from this IP');
export const authRateLimit = createRateLimit(900000, 10, 'Too many authentication attempts');
export const strictRateLimit = createRateLimit(60000, 5, 'Too many requests, please slow down');