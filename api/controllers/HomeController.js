 
const { QueryTypes } = require('sequelize');
const database = require('../../config/database');

const HomeController = () => {
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
     
    const getBanner = async (req, res) => {
        const query = {};
        const result = [];
        let params = req.query;
       

         

         

        try{
        const result = await database.query(`SELECT * FROM home_banner`, {
            type: QueryTypes.SELECT,
            raw:true
        }); 
          

          return res.status(200).json({
                status : true,
                message : 'all home banner',
                 
                data :result
            });
        }catch (err) {
            return res.status(500).json({
                status : false,
                message: 'Internal server error',
                error: err
            });
        }
    }

    const getNews = async (req, res) => {
        const query = {};
        const result = [];
        let params = req.query;
       

         

         

        try{
        const result = await database.query(`SELECT * FROM news_header`, {
            type: QueryTypes.SELECT,
            raw:true
        }); 
          

          return res.status(200).json({
                status : true,
                message : 'all home news',
                 
                data :result
            });
        }catch (err) {
            return res.status(500).json({
                status : false,
                message: 'Internal server error',
                error: err
            });
        }
    }

    const getBerita = async (req, res) => {
        const query = {};
        const result = [];
        let params = req.query;
       

         

         

        try{
        const result = await database.query(`SELECT * FROM news_recent`, {
            type: QueryTypes.SELECT,
            raw:true
        }); 
          

          return res.status(200).json({
                status : true,
                message : 'all home news',
                 
                data :result
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
    getBanner,getNews,getBerita
  };
};


module.exports = HomeController;
