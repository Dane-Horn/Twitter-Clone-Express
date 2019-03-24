const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        authHeader = req.headers.authorization.slice(7);
        console.log(authHeader)
        const decoded = jwt.verify(authHeader, 'secret');
        req.userID = decoded.id;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Auth failed' });
    }
}