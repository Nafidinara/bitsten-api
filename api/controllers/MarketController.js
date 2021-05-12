const Market = require('../models/User');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const MarketController = () => {
  const getAll = async (req, res) => {
    try {
      const markets = await Market.findAll();

      return res.status(200).json({ markets });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    getAll,
  };
};

module.exports = UserController;
