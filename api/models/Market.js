const Sequelize = require('sequelize');
const db = require('../../config/database');
const User = require('./User');

const tableName = 'market';

const Market = db.define('Market', {
    market_id:{
        type: Sequelize.STRING
    },
    last_price:{
        type: Sequelize.STRING
    },
    bid:{
        type: Sequelize.STRING
    },
    ask:{
        type: Sequelize.STRING
    },
    high:{
        type: Sequelize.STRING
    },
    low:{
        type: Sequelize.STRING
    },
    volume:{
        type: Sequelize.STRING
    },
    market_show:{
        type: Sequelize.STRING
    },
    open:{
        type: Sequelize.STRING
    },
    status:{
        type: Sequelize.STRING
    },
}, {tableName,timestamp:false});

module.exports = Market;