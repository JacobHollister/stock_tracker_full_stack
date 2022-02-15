require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Watchlist = require('../models/watchlist')
const bcrypt = require('bcrypt')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
const registerUser = asyncWrapper( async (req, res, next) => {
    const { email, name, password } = req.body;

    if (!name || !email || !password) return next(createCustomError('Please provide name, email and password', 400));

    const emailExists = await User.findOne({ email });
    if (emailExists) return next(createCustomError('Email already exists', 401))

    const user = await User.create({ name, email, password });
    const watchlist = await Watchlist.create({user: user.id, watchlist: [] })
    const token = await generateToken(user.id);

    return res.status(200).json({user, token, expiresIn: process.env.TOKEN_EXP,})
})

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
const loginUser = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return new createCustomError('Please provide email and password', 400);

    const user = await User.findOne({ email });

    if (!user) return new createCustomError('No user exists with this email', 401);

    if(await bcrypt.compare(password, user.password)){
        const token = await generateToken(user.id);
        return res.status(200).json({ msg: 'Successfully logged in!', token, expiresIn: process.env.TOKEN_EXP, userId: id });
    } else {
        return new createCustomError('Invalid Username / Password', 401);
    }
});

const generateToken = async(id) => {
    return jwt.sign({id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.TOEKN_EXP_DAYS});
}

module.exports = {
    registerUser,
    loginUser
}