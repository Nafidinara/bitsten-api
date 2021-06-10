const Market = require('../models/Market');
const { QueryTypes } = require('sequelize');
const database = require('../../config/database');

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

    const getMarket = async (req, res) => {
        const query = {};
        const result = [];
        let params = req.query;
        let pair2 = params.pair;

        if (!pair2){
            return res.status(500).json({
                status : false,
                message: 'Internal server error',
                error: 'please provide valid pair, you can get from market_id in tickers'
            });
        }


        try {
            const m = await database.query(`SELECT *  FROM market where market_show = "${pair2}" limit 1`, {
            type: QueryTypes.SELECT,
            raw:true 
          });
          
          m[0]['change'] = 0 ;
          m[0]['price_idr'] = 123456 ;
          m[0]['price_usd'] = 123 ;
          
          return res.status(200).json({
            status : true,
            message : 'get market detail',
            data: {
                'market':m[0]
            }
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



      const getMain = async (req, res) => {
      
          try{
          return res.status(200).json({
            status : true,
            message : 'get all main market',
            data: ['USDT','IDRT','BST','BNB']
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
      
      
       if (params.order || params.sort){

           if (params.order && params.order !== 'loser' && params.order !== 'gainer'){
               console.log('kalo loser gainer ngga masuk sini')
               order = params.order;
              // Object.assign(query, {limit: limit})
       
           }

           if (params.sort){
               sort = params.sort.toUpperCase();
           }

           Object.assign(query, {order: [[order,sort]]})
       }

      

      const markets = await Market.findAll(query);


       if (params.order === 'loser' || params.order === 'gainer'){
           if(params.order === 'gainer'){
               markets.sort(compare).reverse();
           }
           if(params.order === 'loser'){
               markets.sort(compare)
           }
       }

        var d =  markets.slice(0,limit);
       
      
      return res.status(200).json({
        status : true,
        message : 'get all data tickers',
        data: d
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

    const orderBook = async (req, res) => {
        const query = {};
        const result = [];
        let params = req.query;
        let limit = 5;
        let type = 'both';
        let pair = params.pair;

        if (!pair){
            return res.status(500).json({
                status : false,
                message: 'Internal server error',
                error: 'please provide valid pair, you can get from market_id in tickers'
            });
        }

        if (params.limit){
            limit = parseInt(params.limit)
        }

        if (params.type){
            type = params.type;
        }

        try{
        const buyLimit = await database.query(`SELECT sum((total) - filled) as amount,price FROM ${pair}_buy GROUP BY price ORDER BY price DESC LIMIT ${limit}`, {
            type: QueryTypes.SELECT,
            raw:true
        });
        const sellLimit = await database.query(`SELECT sum((total) - filled) as amount,price FROM ${pair}_sell GROUP BY price ORDER BY price ASC LIMIT ${limit}`, {
            type: QueryTypes.SELECT,
            raw:true
        });

            if (type === 'both'){
                result.push({sellLimit: sellLimit},{buyLimit: buyLimit})
            }

            if (type === 'sell'){
                result.push({sellLimit: sellLimit})
            }

            if (type === 'buy'){
                result.push({buyLimit: buyLimit})
            }

            return res.status(200).json({
                status : true,
                message : 'get all data orderbooks',
                pair : pair,
                data:result
            });
        }catch (err) {
            return res.status(500).json({
                status : false,
                message: 'Internal server error',
                error: err
            });
        }
    }

  return {
    getAll,orderBook,getMarket,getMain
  };
};

module.exports = MarketController;
