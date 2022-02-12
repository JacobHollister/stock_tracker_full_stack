const express = require('express')
const router = express.Router()

const authenticationMiddleware = require('../middleware/auth')

const {
    getAllUsers,
    getUser
} = require('../controllers/userController')

router.route('/').get(authenticationMiddleware, getAllUsers)
router.route('/user').get(authenticationMiddleware, getUser)

module.exports = router