const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, 'secret');
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Auth failed' });
    }
}