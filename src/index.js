const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname, '.env')
})

const express = require('express')
const cors = require('cors')
const { json } = require('body-parser')
const cookieParser = require('cookie-parser')
const chalk = require('chalk')

const { sequelize } = require('./sequelizer/index')
require('./sequelizer/models/index')
const host = process.env.SERVER_HOST,
      port = process.env.SERVER_PORT

const app = express()
app.use(cors())
app.use(json())
app.use(cookieParser())

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
    sequelize.sync({ logging: true, force: true }).then(() => {
        console.log(chalk.green('Sync database has been successfully'))
        app.listen(port, host, () => {
            console.log(chalk.green(`Server started on ${host}:${port}`))
        })
    }).catch(() => { console.log(chalk.red('Sycn database error'))})
}).catch((error) => {console.log(chalk.red('Unable to connect to the database\n', error))})