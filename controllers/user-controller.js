const bcrypt = require('bcrypt')
const dbku = require('../configs/database')
const User = dbku.users

// Role.hasMany(User, { as: "users" });
// User.belongsTo(Role, {
//   foreignKey: "roleId",
//   as: "role",
// })

module.exports = {
    async getUser(requ, resp) {
        const dataUser = await User.findAll()
        return resp.status(200).json({message:'Success get User', data : dataUser})
    },
    async getOneUser(requ, resp) {
        const dataUser = await User.findByPk(requ.params.id, {include: ['role']})
        const role = dataUser.role.role
        return resp.status(200).json({message:'Success get User', data : role})
    },
    async tambah(requ, resp) {
        
        const harusInput = ['nama', 'email', 'username', 'password']
        for (const i in requ.body) {
            if (!(harusInput.includes(i))) {
                return resp.status(403).json({message: 'penginputan tidak lengkap'})
            }
        } 
        const cekUser = await User.findOne({where: {username: requ.body.username}})
        const cekEmail = await User.findOne({where: {email: requ.body.email}})
        if (cekUser|| cekEmail ) {
            return resp.status(403).json({message: 'email atau username yang anda masukkan sudah terdaftar'})
        }

        const passwordHash = await bcrypt.hash(requ.body.password, 10)


        User.create({
            nama: requ.body.nama,
            email: requ.body.email,
            username : requ.body.username,
            password: passwordHash,
            roleId : 1
        })
      
        return resp.status(200).json({message:'Success tambah User', data : 'userBaru'})
    }
}