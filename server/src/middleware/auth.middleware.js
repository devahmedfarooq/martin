import jwt from 'jsonwebtoken';

// Middleware to authenticate user
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    
    // If no token found, return error
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    // Verify token
    try {
        const authToken = token.startsWith('Bearer ') ? token.slice(7, token.length).trimLeft() : token;

        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

        req.user = decoded;
        
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

export default authenticate;
