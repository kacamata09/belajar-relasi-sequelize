const express = require('express')
const roleRoute = express.Router()
const roleController = require('../controllers/role-controller')


roleRoute.route('/role')
    .get(roleController.getRole)
    .post(roleController.tambah)

module.exports = roleRoute