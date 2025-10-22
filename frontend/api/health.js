    export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({
        status: 'OK',
        message: 'Web Programmer Challenge API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production'
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
    }