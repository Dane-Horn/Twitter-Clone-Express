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
            console.log(error);
            return res.status(500).send({ message: 'Internal server error' });
        }
    }
};