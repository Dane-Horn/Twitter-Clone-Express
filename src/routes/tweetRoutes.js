const tweetController = require('../controllers/tweetController');
const checkAuth = require('../auth/check-auth');

module.exports = (app) => {
    app.post('api/tweet/:id/reply', checkAuth, tweetController.createReply);
    app.delete('api/tweet/:id', checkAuth, tweetController.delete);
    app.post('api/tweet', checkAuth, tweetController.create);
};