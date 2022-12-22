const express = require('express')
const userRoute = express.Router()

userRoute.route('/user')
    .get((requ, resp)=> {
        return resp.json({message:'ini user route'})
    })

module.exports = userRoute