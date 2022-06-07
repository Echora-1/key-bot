const sequelize = require('./db');
const { DataTypes } = require('sequelize');


const User = sequelize.define('User', {
    chatId: {type: DataTypes.INTEGER, unique: true},
    key: {type: DataTypes.STRING, unique: true}
})

module.exports = User;
