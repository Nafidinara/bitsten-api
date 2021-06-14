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

    let user = req.token;
    console.log(user);
    let result = {};
    const allCoins = await AllCoin.findAll();

    await asyncForEach(allCoins, async (value,index) => {
      let cek =  await database.query(`SELECT amount, hold, onorder FROM balance_${value.code} WHERE userid = ${user.id} LIMIT 1`, {
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

  const balanceOne = async (req, res) => {

    let user = req.token;
    let code = req.params.coin;
    
      let result =  await database.query(`SELECT amount, hold, onorder FROM balance_${code} WHERE userid = ${user.id} LIMIT 1`, {
        type: QueryTypes.SELECT,
        raw:true
      });
      
    return res.status(200).json({
      status : true,
      message : `Your ${code} balance`,
      result
    });
  }

  return {
    balance,
    balanceOne
  };
};

module.exports = UserController;
