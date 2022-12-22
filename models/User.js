const Sequelize = require('sequelize')
const dbku = require('../configs/database')

const user = dbku.define('user', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull : false,
        unique: true,
        isEmail : true
    },
    username: {
        type: Sequelize.STRING,
        allowNull : false,
        unique: true
    },
    password: Sequelize.STRING,
    
});

user.sync()

module.exports = user