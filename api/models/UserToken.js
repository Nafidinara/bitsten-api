const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'users_token';

const hooks = {};

const UserToken = sequelize.define('UserToken', {
  token: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.STRING,
  },
  userid: {
    type: Sequelize.STRING,
  }
}, { hooks, tableName,timestamps:false });

module.exports = UserToken;
