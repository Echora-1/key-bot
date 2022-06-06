const {Sequelize} = require('sequelize');


module.exports = new Sequelize(
    'keyseller',
    'sinead',
    'jSzO83o0yB9T',
    {
        host: '82.202.198.45',
        port: '6432',
        dialect: 'postgres'
    }
)
