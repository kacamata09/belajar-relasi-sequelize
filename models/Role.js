module.exports = (koneksi, Sequelize) => {
        const role = koneksi.define('role', {
            id : {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            role: {
                type: Sequelize.STRING,
                allowNull : false,
                unique: true,
            },
            desc_role: {
                type: Sequelize.STRING,
                allowNull : false,
            },
            
        });
        return role;
    }
