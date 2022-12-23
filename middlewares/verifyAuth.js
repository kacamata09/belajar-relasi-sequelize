const jwt = require('jsonwebtoken')
const dbku = require('../configs/database')
const User = dbku.users

module.exports = {
    async verifyToken(requ, resp, next) {
        const authHeader = requ.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == undefined || requ.headers['authorization'] == false) {
            return resp.status(401).json({message: 'anda belum memasukkan token'})
        } else {
            try {
                jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
                    if (err) {
                        return resp.status(403).json({message:'kemungkinan token kadaluarsa'})
                    } else {
                        // const cekUser = await User.findOne({where: {username: decode.username}})
                        // if (cekUser) return /next()
                        // return resp.status(403).json({message:'kemungkinan token anda adalah palsu'})
                        next()
                    }
                })
            
            } catch (error) {
                return resp.status(401).json({message: 'token yang anda masukkan salah atau mengalami error'});
            }
        }
    },
    verifyAdmin(requ, resp, next) {
        const authHeader = requ.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        try {
            jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
                if (err) {
                    return resp.status(403).json({message:'kemungkinan token kadaluarsa'})
                } else {
                    const cekUser = await User.findOne({where: {username: decode.username}, include: ['role']})
                    if (cekUser.role.role == 'admin') {
                        return next()
                    }

                    return resp.status(403).json({message:'anda tidak bisa mengakses halaman ini'})
                }
            })
        
        } catch (error) {
            return resp.status(401).json({message: 'token yang anda masukkan salah atau mengalami error'});
        }
    }

}
