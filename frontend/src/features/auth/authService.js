import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000';
const API_URL_REGISTER = '/api/v1/auth/register'
const API_URL_LOGIN = '/api/v1/auth/login'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL_REGISTER, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL_LOGIN, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService