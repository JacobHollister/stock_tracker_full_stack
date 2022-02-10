const express = require('express')
const router = express.Router()

const authenticationMiddleware = require('../middleware/auth')

const {
    getAllUsers
} = require('../controllers/userController')

router.route('/').get(authenticationMiddleware, getAllUsers)

module.exports = router