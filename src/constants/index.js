const {config} = require('dotenv')
config()

module.exports = {
    PORT: process.env.PORT,
    DB_SERVER_URL: process.env.DB_SERVER_URL,
    DB_CLIENT_URL: process.env.DB_CLIENT_URL,
    DB_SECRET: process.env.DB_SECRET
}