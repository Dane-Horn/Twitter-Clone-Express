const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v1');
module.exports = {
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
            console.log("user id is:", req.userID)
            let user = await User.findOne({ where: { id: req.userID } });
            if (!user)
                return res.status(404).send({ message: 'User not found' });
            await user.destroy();
            return res.status(204).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal server error' });
        }
    }
};