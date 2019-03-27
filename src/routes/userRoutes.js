const userController = require('../controllers/userController');
const checkAuth = require('../auth/check-auth');

module.exports = (app) => {
    app.delete('/user/deregister', checkAuth, userController.delete);
    app.get('/user/following', checkAuth, userController.following);
    app.post('/follow/:id', checkAuth, userController.follow);
    app.delete('/unfollow/:id', checkAuth, userController.unfollow);
    app.get('/feed', checkAuth, userController.feed);
    app.get('/posts/own', checkAuth, userController.ownPosts);
    app.post('/user/register', userController.create);
    app.post('/user/login', userController.login);
    app.post('/posts/:id');
}