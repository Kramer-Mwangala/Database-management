const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Expense = require('./expense')(sequelize, DataTypes);
db.User = require('./user')(sequelize, DataTypes);

module.exports = db;

