const express = require('express')
const authRoute = express.Router()
const authController = require('../controllers/auth-controller')

authRoute.post('/login', authController.login)

module.exports = authRoute