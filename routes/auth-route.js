const express = require('express')
const authRoute = express.Router()

authRoute.route('/login')
    .get((requ, resp)=> {
        return resp.json({message:'ini login route'})
    })

module.exports = authRoute