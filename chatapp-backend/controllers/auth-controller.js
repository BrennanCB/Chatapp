const Joi = require('joi');
const HttpStatusCodes = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user-models');
const Helpers = require('../helpers/helpers');
const dbConfig = require('../config/secret');

module.exports = {
    async CreateUser(req, res) {
        const schema = Joi.object().keys({
            username: Joi.string().min(5).max(10).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required()
        });

        const {error, value} = Joi.validate(req.body, schema);

        if (error && error.details) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({message: error.details});
        }

        const userEmail = await User.findOne({email: Helpers.lowerCase(value.email)});

        if (userEmail) {
            return res.status(HttpStatusCodes.CONFLICT).json({message: 'Email already exists'});
        }

        const username = await User.findOne({username: Helpers.firstUpper(value.username)});

        if (username) {
            return res.status(HttpStatusCodes.CONFLICT).json({message: 'Username already exists'});
        }

        return bcrypt.hash(value.password, 10, async (err, hash) => {
            if (err) {
                return res.status(HttpStatusCodes.BAD_REQUEST).json({message: 'Error hashing password'});
            }

            const body = {
                username: Helpers.firstUpper(value.username),
                email: Helpers.lowerCase(value.email),
                password: hash
            };
            try {
                const user = await User.create(body);

                const token = jwt.sign({data: user}, dbConfig.secret, {
                    expiresIn: 120
                });

                res.cookie('auth', token);

                res.status(HttpStatusCodes.CREATED).json({'message': 'User created successfully', user, token});
            } catch (error) {
                res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error occured'});
            }

        });
    }
};
