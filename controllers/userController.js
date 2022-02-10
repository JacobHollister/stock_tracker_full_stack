const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const User = require('../models/User')

const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await User.find()
    if(!users) createCustomError("No users found", 404) 
    
    return res.status(200).json(users);
})

module.exports = {
    getAllUsers
}