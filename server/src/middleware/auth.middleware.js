import jwt from 'jsonwebtoken';

// Middleware to authenticate user
const authenticate = (req, res, next) => {
    let token = req.headers['authorization'];

    // If no token found, return error
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    if (token) {
        token = token.replace(/^"|"$/g, ''); // Removes leading and trailing quotes
    }

    // Verify token
    try {
        const authToken = token.startsWith('Bearer ') ? token.slice(7, token.length).trimLeft() : token;
        //   console.log("authToken : ", authToken)
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        //     console.log("decoded : ", decoded)
        req.user = decoded;

        next();
    } catch (err) {
        console.log("LOG TOKEN CHECK MIDDLEWARE : ", token)
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

export default authenticate;
