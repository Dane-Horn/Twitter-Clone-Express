const retweetController = require('../controllers/retweetController');
const checkAuth = require('../auth/check-auth');

module.exports = (app) => {
    app.post('/api/retweet/:id', checkAuth, retweetController.create);
    app.delete('/api/retweet/:id', checkAuth, retweetController.delete);
};