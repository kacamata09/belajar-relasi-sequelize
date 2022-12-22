const express = require('express')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const PORT = 3000

const app = express()

// routes
const routes = require('./routes/index_route')

// database
const dbku = require('./configs/database')

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// koneksi
const koneksi = async () => {
    await dbku.koneksi.sync()
    await dbku.koneksi.authenticate()
    console.log(`server ${process.env.JENIS_DATABASE} berjalan di PORT ${process.env.PORT_DATABASE}`)
}
koneksi()

// register routes
for (const r in routes) {
    app.use(routes[r])
}



app.listen(PORT, console.log(`server sedang berjalan di PORT ${PORT}`))