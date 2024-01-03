const { DataTypes } = require('sequelize');
const sequelize = require('../connect');
const { Contact } = require('./contact');
const { SpamData } = require('./spamData');

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.hasMany(Contact, {foreignKey: 'userId'});
User.hasMany(SpamData, {foreignKey: 'userId'});

Contact.belongsTo(User);
SpamData.belongsTo(User);

module.exports = { User };