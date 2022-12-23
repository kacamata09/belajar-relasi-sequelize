const express = require('express')
const roleRoute = express.Router()
const roleController = require('../controllers/role-controller')
const mwVerifAuth = require('../middlewares/verifyAuth')


roleRoute.route('/role')
    .get(mwVerifAuth.verifyToken, roleController.getRole)
    .post(mwVerifAuth.verifyToken ,roleController.tambah)

module.exports = roleRoute