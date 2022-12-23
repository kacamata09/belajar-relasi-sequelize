const express = require('express')
const userRoute = express.Router()
const userController = require('../controllers/user-controller')
const mwVerifAuth = require('../middlewares/verifyAuth')


userRoute.route('/user')
    .get([mwVerifAuth.verifyToken, mwVerifAuth.verifyAdmin], userController.getUser)
    .post(mwVerifAuth.verifyToken, userController.tambah)

userRoute.route('/user/:id')
    .get(mwVerifAuth.verifyToken, userController.getOneUser)
    .post(mwVerifAuth.verifyToken, userController.edit)


module.exports = userRoute