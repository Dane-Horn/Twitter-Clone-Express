const userController = require('../controllers/userController');
const checkAuth = require('../auth/check-auth');

module.exports = (app) => {
    app.get('/api/user/me', checkAuth, userController.me);
    app.get('/api/comp', userController.comp);
    app.delete('/api/user/deregister', checkAuth, userController.delete);
    app.get('/api/user/following', checkAuth, userController.following);
    app.post('/api/follow/:id', checkAuth, userController.follow);
    app.delete('/api/unfollow/:id', checkAuth, userController.unfollow);
    app.get('/api/feed', checkAuth, userController.feed);
    app.get('/api/posts/own', checkAuth, userController.ownPosts);
    app.post('/api/user/register', userController.create);
    app.post('/api/user/login', userController.login);
    app.post('/api/posts/:id');
}