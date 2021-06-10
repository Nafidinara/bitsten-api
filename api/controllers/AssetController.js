const Asset = require('../models/Asset');

const AssetController = () => {
  const query = {};
  limit = 5;
  const getAll = async (req, res) => {
    try {

      let params = req.query;

      if (params.limit){
        limit = parseInt(params.limit)
      }
      Object.assign(query, {limit: limit})

      const assets = await Asset.findAll(query);

      return res.status(200).json({
        status : true,
        message : 'get all data assets',
        data:assets
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

module.exports = AssetController;
