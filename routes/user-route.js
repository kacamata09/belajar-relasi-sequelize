const express = require('express')
const userRoute = express.Router()
const userController = require('../controllers/user-controller')
const mwVerifToken = require('../middlewares/verifyToken')


userRoute.route('/user')
    .get(mwVerifToken.verifyToken, userController.getUser)
    .post(mwVerifToken.verifyToken, userController.tambah)

userRoute.route('/user/:id')
    .get(mwVerifToken.verifyToken, userController.getOneUser)
    .post(mwVerifToken.verifyToken, userController.edit)


module.exports = userRoute