// LIBRARY IMPORT
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({message: "Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, 'skpiapilactelkom');

        req.user = decoded;
        
        next();

    } catch (error) {
        return res.status(401).json({message: "Unauthorized"});
    }
}

module.exports = { authenticateToken };
