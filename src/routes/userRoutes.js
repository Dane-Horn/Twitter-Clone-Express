const userController = require('../controllers/userController');
const checkAuth = require('../auth/check-auth');

module.exports = (app) => {
    app.post('/user/register', userController.create);
    app.post('/user/login', userController.login);
    app.delete('/user/deregister', checkAuth, userController.delete);
    app.post('/follow/:id', checkAuth, userController.follow);
    app.delete('/unfollow/:id', checkAuth, userController.unfollow);
    app.get('/posts/own', checkAuth, userController.ownPosts);
    app.get('/feed', checkAuth, userController.feed);
}