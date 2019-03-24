const userController = require('../controllers/userController');
const checkAuth = require('../auth/check-auth');

module.exports = (app) => {
    app.get('/user', checkAuth, (req, res) => {
        res.status(200).send("Authorized");
    });
}