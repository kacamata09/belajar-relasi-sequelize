const bcrypt = require('bcrypt')
const dbku = require('../configs/database')
const Role = dbku.roles

// Role.hasMany(Role, { as: "users" });
// Role.belongsTo(Role, {
//   foreignKey: "roleId",
//   as: "role",
// })

module.exports = {
    async getRole(requ, resp) {
        const dataUser = await Role.findAll()
        return resp.status(200).json({message:'Success get Role', data : dataUser})
    },
    async tambah(requ, resp) {
        
        // const harusInput = ['email', 'username', 'password']
        // for (const i in requ.body) {
        //     if (!(harusInput.includes(i))) {
        //         return resp.status(403).json({message: 'penginputan tidak lengkap'})
        //     }
        // } 
        const cekRole = await Role.findOne({where: {role: requ.body.role}})
        if (cekRole ) {
            return resp.status(403).json({message: 'role yang anda masukkan sudah terdaftar'})
        }

        Role.create({
            role: requ.body.role,
            desc_role: requ.body.desc_role,
        })
      
        return resp.status(200).json({message:'Success tambah Role', data : 'rolebaru'})
    },
    async edit(requ, resp) {
        await Role.update({
            nama: requ.body.nama,
            email: requ.body.email,
        }, {where : {id: requ.params.id}})

        const user = await Role.findByPk(requ.params.id, { attributes: {exclude: ['password', 'createdAt', 'updatedAt']}})
        return resp.status(200).json({message: 'success update', data : user})

    },
    async hapus(requ, resp) {
        await Role.destroy({where: {
            id: requ.params.id
        }})
        return resp.status(200).json({message: 'success delete'})
    }
}