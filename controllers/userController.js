const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const User = require('../models/User')


// @desc    Get all users information
// @route   GET /api/v1/users
// @access  Private(admin)
const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await User.find()
    if(!users) createCustomError("No users found", 404) 
    
    return res.status(200).json(users);
})

// @desc    Get user information
// @route   GET /api/v1/user/user
// @access  Private
const getUser = asyncWrapper(async (req, res) => {
    const user = await User.find({_id: req.user._id}).select('-password')
    if(!user) return createCustomError("No user found", 404) 
    
    return res.status(200).json(user);
})

module.exports = {
    getAllUsers,
    getUser
}