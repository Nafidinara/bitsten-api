const privateRoutes = {
  // 'GET /users': 'UserController.getAll',
    'GET /fund/balance/all' : 'UserController.balance',
    'GET /fund/balance/:coin' : 'UserController.balanceOne'
};

module.exports = privateRoutes;
