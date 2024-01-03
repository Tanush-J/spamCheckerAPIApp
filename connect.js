const { Sequelize } = require('sequelize');
require('dotenv').config()

const env = process.env;

const sequelize = new Sequelize(env.DB_NAME, env.DB_USERNAME, env.DB_PASSWORD, {
    host: env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Disable logging SQL queries to the console
})

module.exports = sequelize
