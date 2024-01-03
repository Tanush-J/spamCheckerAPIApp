const { DataTypes } = require('sequelize');
const sequelize = require('../connect');

const SpamData = sequelize.define('SpamData', {
    spamId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = { SpamData };

//phone number validation
//password hasing
//email single 
//single person can't spam same person
//search trim
//userinfo
