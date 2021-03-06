const Retweet = require('../models').Retweet;
const Tweet = require('../models').Tweet;
const uuid = require('uuid/v1');

module.exports = {
    async create(req, res) {
        try {
            let tweet = await Tweet.findOne({ where: { id: req.params.id } });
            if (!tweet)
                return res.status(404).send({ message: 'Tweet not found' });
            req.body.id = uuid();
            req.body.user_id = req.userID;
            req.body.tweet_id = req.params.id;
            let fields = Object.keys(req.body);
            let retweet = await Retweet.create(req.body, { fields });
            return res.status(201).send();
        } catch (error) {
            return res.status(500).send({ message: 'Internal server error' });
        }
    },
    async delete(req, res) {
        try {
            let retweet = await Retweet.findOne({ where: { id: req.params.id } });
            if (!retweet)
                return res.status(404).send({ message: 'Retweet not found' });
            if (retweet.user_id != req.userID)
                return res.status(401).send({ message: 'Unauthorized' });
            await retweet.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).send({ message: 'Internal server error' });
        }
    }
};