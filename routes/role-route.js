const express = require('express')
const roleRoute = express.Router()
const roleController = require('../controllers/role-controller')
const mwVerifToken = require('../middlewares/verifyToken')


roleRoute.route('/role')
    .get(mwVerifToken.verifyToken, roleController.getRole)
    .post(mwVerifToken.verifyToken ,roleController.tambah)

module.exports = roleRoute