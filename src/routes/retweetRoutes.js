const retweetController = require('../controllers/retweetController');
const checkAuth = require('../auth/check-auth');

module.exports = (app) => {
    app.post('/retweet/:id', checkAuth, retweetController.create);
    app.delete('/retweet/:id', checkAuth, retweetController.delete);
};