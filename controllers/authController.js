require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error');


const registerUser = asyncWrapper( async (req, res) => {
    const { email, name, password } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
        return next(createCustomError('Email already exists', 401))
    }

    const user = await User.create({ name, email, password });

    return res.status(200).json(user)
})

const loginUser = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return new createCustomError('Please provide email and password', 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
        return new createCustomError('No user exists with this email', 401);
    }
    const { id } = user

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return new createCustomError('Invalid Username / Password', 401);
    }

    const token = jwt.sign({id, email}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.status(200).json({ msg: 'Successfully logged in!', token, expiresIn: 3600, userId: id });
    });

module.exports = {
    registerUser,
    loginUser
}