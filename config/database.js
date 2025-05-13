const Sequelize = require('sequelize');

const sequelize = new Sequelize('db_tikwork', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
