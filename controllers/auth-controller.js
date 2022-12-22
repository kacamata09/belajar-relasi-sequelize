const dbku = require('../configs/database')
const User = dbku.users

module.exports = {
    async login(requ, resp) {
        const username = requ.body.username
        const password = requ.body.password

        const user = await User.findOne({where: {username: username}})
        if (user == null) {
            return resp.status(401).json({message: 'user tak ditemukan'})
        }
        // return resp.status(200).json({message: 'cekuser', status: cekUser})
    
        const passwordVerif = await bcrypt.compare(password, user.password)
        console.log(passwordVerif)
        if (!passwordVerif) {
            return resp.status(401).json({message:'password salah'})
        } else {
            if (rows[0].role == 'admin') {
                resp.redirect('/admin')
                return
            } else {
                resp.redirect('/')
                return
            }
        }
       


    
    }
}