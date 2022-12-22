const express = require('express')
const userRoute = express.Router()
const userController = require('../controllers/user-controller')


userRoute.route('/user')
    .get(userController.getUser)
    .post(userController.tambah)

userRoute.route('/user/:id')
    .get(userController.getOneUser)
    // .post(userController.tambah)


module.exports = userRoute