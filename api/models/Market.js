const Sequelize = require('sequelize');
const db = require('../../config/database');
const User = require('./User');

const tableName = 'market';

const hooks = {
    afterFind: function(result) {
        if(result.constructor === Array) {
            for (let i = 0; i < result.length; i++) {
                result[i].change = ((result[i].bid - result[i].open) / (result[i].open * 0.01)).toFixed(2);
            }
        } else {
            result.change = ((result.bid - result.open) / (result.open * 0.01)).toFixed(2);
        }
        return result;
    }
}

const Market = db.define('Market', {
    market_id:{
        type: Sequelize.BIGINT
    },
    last_price:{
        type: Sequelize.DOUBLE
    },
    bid:{
        type: Sequelize.DOUBLE
    },
    ask:{
        type: Sequelize.DOUBLE
    },
    high:{
        type: Sequelize.DOUBLE
    },
    low:{
        type: Sequelize.DOUBLE
    },
    volume:{
        type: Sequelize.DOUBLE
    },
    market_show:{
        type: Sequelize.STRING
    },
    open:{
        type: Sequelize.DOUBLE
    },
    status:{
        type: Sequelize.INTEGER
    },
    change: Sequelize.VIRTUAL,
}, {hooks,tableName,timestamps:false});

module.exports = Market;