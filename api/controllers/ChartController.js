const Chart = require('../models/Chart');
const { QueryTypes } = require('sequelize');
const database = require('../../config/database');

const ChartController = () => {

  const getAll = async (req, res) => {
    const query = {};
    let params = req.query;
    let limit = 5;
    let pair = params.pair;

    if (!pair){
      return res.status(500).json({
        status : false,
        message: 'Internal server error',
        error: 'please provide valid pair, you can get from market_id in tickers'
      });
    }

    try {

      if (params.limit){
        limit = parseInt(params.limit)
      }

      const charts = await database.query(`SELECT DATE as d,OPEN as o,CLOSE as c,HIGH as h ,LOW as l,VOLUME as v FROM chart_${pair} order by id desc LIMIT ${limit}`, {
        type: QueryTypes.SELECT,
        raw:true
      });

      return res.status(200).json({
        status : true,
        message : 'get all data charts',
        pair : pair,
        data:charts
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json({
          status : false,
          message: 'Internal server error',
          error: err
      });
    }
  };

  return {
    getAll,
  };
};

module.exports = ChartController;
