const userController = require('../controllers/userController');
const checkAuth = require('../auth/check-auth');

module.exports = (app) => {
    app.post('/user/register', userController.create);
    app.post('/user/login', userController.login);
}