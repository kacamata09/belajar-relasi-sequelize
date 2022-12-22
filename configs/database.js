const Sequelize = require('sequelize')

const dbku = new Sequelize(process.env.NAMA_DATABASE, process.env.USER_DATABASE, process.env.PASSWORD_DATABASE, {
    dialect: process.env.JENIS_DATABASE,
    host: process.env.HOST_DATABASE,
    port : process.env.PORT_DATABASE
})


module.exports = dbku