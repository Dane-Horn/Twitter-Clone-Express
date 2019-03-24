const userController = require('../controllers/userController');
const checkAuth = require('../auth/check-auth');

module.exports = (app) => {
    app.get('/user/register', userController.create);
    app.get('/user/login', userController.login);
}