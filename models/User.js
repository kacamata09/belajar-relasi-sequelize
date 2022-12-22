module.exports = (koneksi, Sequelize) => {
        const user = koneksi.define('user', {
            id : {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            roleId : {
                type: Sequelize.INTEGER,
            },
            nama: {
                type: Sequelize.STRING,
                allowNull : false,
            },
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
            password: {
                type: Sequelize.STRING,
                allowNull : false,
            },
            
        });
        return user;
    }

