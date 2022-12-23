const dbku = require('../configs/database')
const User = dbku.users
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


module.exports = {
    async login(requ, resp) {
        const username = requ.body.username
        const password = requ.body.password

        const user = await User.findOne({where: {username: username}, include: ['role']})
        if (user == null) {
            return resp.status(401).json({message: 'user tak ditemukan'})
        }

    
        const passwordVerif = await bcrypt.compare(password, user.password)
        // console.log(passwordVerif)
        if (!passwordVerif) {
            return resp.status(401).json({message:'password salah'})
        } else {
            const token = jwt.sign({username, password}, process.env.SECRET_KEY, {algorithm: 'HS256'})
            if (user.role.role == 'admin') {
                return resp.status(200).json({message:'anda adalah admin', token})
            } else {
                return resp.status(401).json({message:'anda bukan admin'})
            }
        }
       


    
    }
}