const User = require('../models').User;
const Following = require('../models').Following;
const Tweet = require('../models').Tweet;
const Retweet = require('../models').Retweet;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v1');
const snakeCaseKeys = require('snakecase-keys');

function snakeCaseArray(arr) {
    let ret =
        arr.map((item) => {
            item = item.get({ plain: true });
            item = snakeCaseKeys(item);
            return item;
        });
    return ret;
}

module.exports = {
    async comp(req, res) {
        function fib(n) {
            if (n < 0) return 0;
            if (n == 1) return 1;
            return fib(n - 1) + fib(n - 2);
        }
        return res.status(200).send({ message: fib(30) });
    },
    async create(req, res) {
        try {
            const hash = await bcrypt.hash(req.body.password, 12);
            let user = await User.findOne({ where: { email: req.body.email } });

            if (user)
                return res.status(400).send({ message: 'invalid user sent' });
            let newUser = await User.create({
                id: uuid(),
                username: req.body.username,
                email: req.body.email,
                password: hash
            });

            let { dataValues: { password, ...payload } } = newUser;
            let token = jwt.sign({
                id: payload.id
            }, 'secret', {
                    expiresIn: '1h'
                });
            return res.status(200).send({ token });
        } catch (error) {
            return res.status(500).send({ message: 'Internal server error' });
        }
    },
    async login(req, res) {
        try {
            let user = await User.findOne({ where: { email: req.body.email } });
            if (!user)
                return res.status(400).send({ message: 'Invalid user sent' });
            let { dataValues: { password, ...payload } } = user;
            let valid = await bcrypt.compare(req.body.password, password);
            if (!valid)
                return res.status(401).send({ message: 'Auth failed' });
            let token = jwt.sign({
                id: payload.id
            }, 'secret', {
                    expiresIn: '1h'
                });
            return res.status(200).send({ token });
        } catch (error) {
            return res.status(500).send({ message: 'Internal server error' });
        }
    },
    async delete(req, res) {
        try {
            let user = await User.findOne({ where: { id: req.userID } });
            if (!user)
                return res.status(404).send({ message: 'User not found' });
            await user.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).send({ message: 'Internal server error' });
        }
    },
    async follow(req, res) {
        try {
            if (req.userID === req.params.id)
                return res.status(400).send({ message: 'Cannot follow yourself' });
            let user = await User.findOne({ where: { id: req.params.id } });
            if (!user)
                return res.status(400).send({ message: 'Invalid user sent' });
            let follow = await Following.findOne({
                where: {
                    user_id: req.userID,
                    following_id: req.params.id
                }
            });
            if (follow)
                return res.status(400).send({ message: 'Already following user' });
            let following = await Following.create({
                user_id: req.userID,
                following_id: req.params.id
            });
            res.status(201).send();
        } catch (error) {
            return res.status(500).send({ message: 'Internal server error' });
        }
    },
    async unfollow(req, res) {
        try {
            let following = await Following.findOne({
                where: {
                    user_id: req.userID,
                    following_id: req.params.id
                }
            });
            if (!following)
                return res.status(400).send({ message: 'Invalid user sent' });
            await following.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).send({ message: 'Internal server error' });
        }
    },
    async me(req, res) {
        try {
            let user = await User.findOne({ where: { id: req.userID } });
            if (!user)
                return res.status(401).send();
            return res.status(200).send({ user: user })
        } catch (error) {
            return res.status(500).send({ message: 'Internal server error' });
        }
    },
    async ownPosts(req, res) {
        try {
            let tweets = await Tweet.findAll({
                where: { user_id: req.userID }
            });
            let retweets = await Retweet.findAll({
                where: { user_id: req.userID }
            });
            tweets = snakeCaseArray(tweets);
            retweets = snakeCaseArray(retweets);
            res.status(200).send({ tweets, retweets });
        } catch (error) {
            return res.status(500).send({ message: 'Internal server error' });
        }
    },
    async feed(req, res) {
        try {
            let following = await Following.findAll(
                {
                    where: {
                        user_id: req.userID
                    },
                    include: [
                        {
                            model: User,
                            as: 'following',
                            include: [
                                {
                                    model: Tweet,
                                    where: { references: null },
                                    include: [
                                        {
                                            model: Tweet,
                                            as: 'replies'
                                        }
                                    ]
                                },
                                {
                                    model: Retweet
                                }
                            ],
                            attributes: ['id']
                        }
                    ],
                    attributes: []
                }
            );
            let ret = { tweets: [], retweets: [] };
            following.forEach((item) => {
                let { dataValues: { following: { id, Tweets, Retweets } } } = item;
                ret.tweets = ret.tweets.concat(Tweets);
                ret.retweets = ret.retweets.concat(Retweets);
            });
            ret.tweets = snakeCaseArray(ret.tweets);
            ret.retweets = snakeCaseArray(ret.retweets);
            res.status(200).send(ret);
        } catch (error) {
            res.status(500).send({ message: 'Internal server error' });
        }

    },
    async otherPosts(req, res) {
        try {
            let tweets = await Tweet.findAll({
                where: { user_id: req.params.id }
            });
            let retweets = await Retweet.findAll({
                where: { user_id: req.params.id }
            });
            tweets = snakeCaseArray(tweets);
            retweets = snakeCaseArray(retweets);
            res.status(200).send({ tweets, retweets });
        } catch (error) {
            return res.status(500).send({ message: 'Internal server error' });
        }
    },
    async following(req, res) {
        try {
            let following = await Following.findAll({
                where: { user_id: req.userID },
                include: [
                    {
                        model: User,
                        as: 'following',
                        attributes: ['id', 'username']
                    }
                ],
                attributes: []
            });
            following = following.map((item) => {
                let { following: { dataValues: user } } = item;
                user = snakeCaseKeys(user);
                return user;
            });
            res.status(200).send(following);
        } catch (error) {
            res.status(500).send({ message: 'Internal server error' });
        }
    }
};