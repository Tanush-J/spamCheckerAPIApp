const { DataTypes } = require('sequelize');
const sequelize = require('../connect');

const Contact = sequelize.define('Contact', {
    contactId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = { Contact }