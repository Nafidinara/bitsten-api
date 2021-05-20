const Market = require('../models/Market');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const MarketController = () => {
  const getAll = async (req, res) => {
    const query = {};
    try {
      let params = req.query;
      
      if (params.limit){
        Object.assign(query, {limit: parseInt(params.limit)})
      }

      // Object.assign(query, {attributes})
      
      const markets = await Market.findAll(query);

      return res.status(200).json({
        status : true,
        message : 'get all data tickers',
        markets
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    getAll,
  };
};

module.exports = MarketController;
