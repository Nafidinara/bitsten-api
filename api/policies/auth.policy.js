const JWTService = require('../services/auth.service');
const User = require('./../models/Usertoken');

// usually: "Authorization: Bearer [token]" or "token: [token]"
module.exports = async (req, res, next) => {
  let tokenToVerify;

  if (req.header('Authorization')) {
    const parts = req.header('Authorization').split(' ');

    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/.test(scheme)) {
        tokenToVerify = credentials;
      } else {
        return res.status(401).json({ msg: 'Format for Authorization: Bearer [token]' });
      }
    } else {
      return res.status(401).json({ msg: 'Format for Authorization: Bearer [token]' });
    }
  } else if (req.body.token) {
    tokenToVerify = req.body.token;
    delete req.query.token;
  } else {
    return res.status(401).json({ msg: 'No Authorization was found' });
  }
  
    const user = await User.findOne({
    where: {
      token : tokenToVerify
    },
      order : [['id','DESC']]
  });


  // console.log(user);
  // const users = await User.findAll({
  //   where: {
  //     userid : user.userid,
  //     token : tokenToVerify
  //   },
  //     order : [['id','DESC']]
  // });
  //
  //  console.log(users);

  if (!user){
    return res.status(401).json({ msg: 'No Authorization was found, Token expired' });
  }else{
    if (user.token == tokenToVerify){
      //return JWTService().verify(tokenToVerify, (err, thisToken) => {
      // if (err) return res.status(401).json({ err });
      req.token = user;
      return next();
      //});
    }else{
      return res.status(401).json({ msg: 'No Authorization was found, Token expired' });
    }
  }
};
