const Sequelize = require('sequelize')

const koneksi = new Sequelize(process.env.NAMA_DATABASE, process.env.USER_DATABASE, process.env.PASSWORD_DATABASE, {
    dialect: process.env.JENIS_DATABASE,
    host: process.env.HOST_DATABASE,
    port : process.env.PORT_DATABASE
})

const dbku = {}
dbku.Sequelize = Sequelize
dbku.koneksi = koneksi


dbku.users = require('../models/User')(koneksi, Sequelize)
dbku.roles = require('../models/Role')(koneksi, Sequelize)

dbku.roles.hasMany(dbku.users, { as: "users" })
dbku.users.belongsTo(dbku.roles, {
  foreignKey: "roleId",
  as: "role",
})

// koneksi.sync()


module.exports = dbku