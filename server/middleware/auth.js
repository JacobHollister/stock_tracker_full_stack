require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { createCustomError } = require('../errors/custom-error')

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return next(createCustomError(`No token, authorization denied`, 404))
    }
    try {
        const token = authHeader.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        
        req.user = await User.findById(decodedToken.id).select('_id')

        next()
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid token, authorization denied' });
    }
}

module.exports = authenticationMiddleware
