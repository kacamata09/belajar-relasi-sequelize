const bcrypt = require('bcrypt')
const dbku = require('../configs/database')
const User = dbku.users


module.exports = {
    async getUser(requ, resp) {
        const dataUser = await User.findAll({ attributes: {exclude: ['password', 'createdAt', 'updatedAt']}})
        // return resp.status(200).json({message:'Success get User', data : dataUser})
        return resp.status(200).json({message:'Success get User', data : dataUser})
    },
    async getOneUser(requ, resp) {
        const dataUser = await User.findByPk(requ.params.id, {include: ['role'], attributes: {exclude: ['password', 'createdAt', 'updatedAt']}},)
        return resp.status(200).json({message:'Success get User', data : dataUser})
    },
    async tambah(requ, resp) {
        
        const harusInput = ['nama', 'email', 'username', 'password', 'roleId']
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
            roleId : requ.body.roleId
        })
      
        return resp.status(200).json({message:'Success tambah User', data : 'userBaru'})
    },
    async edit(requ, resp) {
        await User.update({
            nama: requ.body.nama,
            email: requ.body.email,
        }, {where : {id: requ.params.id}})

        const user = await User.findByPk(requ.params.id, { attributes: {exclude: ['password', 'createdAt', 'updatedAt']}})
        return resp.status(200).json({message: 'success update', data : user})

    },
    async hapus(requ, resp) {
        await User.destroy({where: {
            id: requ.params.id
        }})
        return resp.status(200).json({message: 'success delete'})
    }

}