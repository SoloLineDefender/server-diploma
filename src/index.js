const express = require('express')
const path = require('path')
const cors = require('cors')
const { json } = require('body-parser')
const cookieParser = require('cookie-parser')

require('dotenv').config({
    path: path.resolve(__dirname, '.env')
})

const host = process.env.SERVER_HOST,
      port = process.env.SERVER_PORT

const app = express()
app.use(cors())
app.use(json())
app.use(cookieParser())

app.listen(port, host, () => {
    console.log(`Server started on ${host}:${port}`)
})