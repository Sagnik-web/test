const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()



exports.protectAuth =async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const secretKey = process.env.SECRET_KEY
        const decoded =await jwt.verify(token, secretKey); // Secret should match what you used when signing the JWT
        req.user = decoded.userId;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};





