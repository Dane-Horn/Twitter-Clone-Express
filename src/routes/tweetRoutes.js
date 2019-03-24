const tweetController = require('../controllers/tweetController');
const checkAuth = require('../auth/check-auth');

module.exports = (app) => {
    app.post('/tweet', checkAuth, tweetController.create);
    app.post('/tweet/:id/reply', checkAuth, tweetController.createReply);
};