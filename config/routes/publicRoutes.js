const publicRoutes = {
  // 'POST /user': 'UserController.register',
  // 'POST /register': 'UserController.register', // alias for POST /user
  // 'POST /login': 'UserController.login',
  // 'POST /validate': 'UserController.validate',
  'GET /tickers': 'MarketController.getAll',
  'GET /assets': 'AssetController.getAll',
};

module.exports = publicRoutes;
