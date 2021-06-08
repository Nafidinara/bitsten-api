const { QueryTypes } = require('sequelize');
const database = require('../../config/database');
const AllCoin = require('./../models/AllCoin');

const UserController = () => {

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  const balance = async (req, res) => {

    let user = req.user;
    let result = {};
    const allCoins = await AllCoin.findAll();

    //  allCoins.forEach( (value, index) => {
    //   // console.log(value.code);
    //   result[value.code] = database.query(`SELECT * FROM balance_btc WHERE userid = ${user.userid} LIMIT 1`, {
    //     type: QueryTypes.SELECT,
    //   });
    // });

    await asyncForEach(allCoins, async (value,index) => {
      let cek =  await database.query(`SELECT amount, hold, onorder FROM balance_${value.code} WHERE userid = ${user.userid} LIMIT 1`, {
        type: QueryTypes.SELECT,
        raw:true
      });
      result[value.code] = cek[0];
    })


    return res.status(200).json({
      status : true,
      message : 'All your balance',
      result
    });
  }

  return {
    balance
  };
};

module.exports = UserController;
