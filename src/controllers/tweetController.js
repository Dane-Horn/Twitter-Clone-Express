const Tweet = require('../models').Tweet;
const User = require('../models').User;
const uuid = require('uuid/v1');

module.exports = {
    async create(req, res) {
        try {
            req.body.user_id = req.userID;
            req.body.id = uuid();
            let fields = Object.keys(req.body);
            let tweet = await Tweet.create(req.body, { fields });
            return res.status(201).send();
        } catch (error) {
            return res.status(500).send({ message: 'Internal server error' });
        }
    },
    async createReply(req, res) {
        try {
            let replyTweet = await Tweet.findOne({ where: { id: req.params.id } });
            if (!replyTweet)
                res.status(400).send({ message: 'Invalid tweet' });
            req.body.references = req.params.id;
            req.body.user_id = req.userID;
            req.body.id = uuid();
            let fields = Object.keys(req.body);
            let reply = await Tweet.create(req.body, { fields });
            return res.status(201).send();
        } catch (error) {
            return res.status(500).send({ message: 'Internal server error' });
        }
    },
    async delete(req, res) {
        try {
            let tweet = await Tweet.findOne({ where: { id: req.params.id } });
            if (!tweet)
                return res.status(404).send({ message: 'Tweet does not exist' });
            if (tweet.user_id != req.userID)
                return res.status(401).send({ message: 'Unauthorized' });
            await tweet.destroy();
            res.status(204).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal server error' });
        }
    }
};