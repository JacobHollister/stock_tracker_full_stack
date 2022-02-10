require('dotenv').config()
const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1]
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const { id, email } = decodedToken
        req.user = { id, email }
        next()
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid token, authorization denied' });
    }
}

module.exports = authenticationMiddleware
