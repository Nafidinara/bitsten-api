const Market = require('../models/Market');

const MarketController = () => {
    //function for order by change
    const compare = (a,b) => {
        if ( a.change * 1 < b.change * 1 ){
            return -1;
        }
        if ( a.change * 1 > b.change * 1 ){
            return 1;
        }
        return 0;
    }
  const getAll = async (req, res) => {
    const query = {};
    let limit = 5;
    let sort = 'ASC';
    let order = 'id';
    try {
      let params = req.query;
      
      if (params.limit){
        limit = parseInt(params.limit)
      }
      Object.assign(query, {limit: limit})

       if (params.order || params.sort){

           if (params.order && params.order !== 'change'){
               order = params.order;
           }

           if (params.sort){
               sort = params.sort.toUpperCase();
           }

           Object.assign(query, {order: [[order,sort]]})
       }

      const markets = await Market.findAll(query);

       if (params.order === 'change'){
           if(sort === 'ASC'){
               markets.sort(compare).reverse();
           }
           if(sort === 'DESC'){
               markets.sort(compare)
           }
       }

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
