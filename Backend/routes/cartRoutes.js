
const {addOrder, addToCart, getCartInfo, getAllCartInfo} = require('../controllers/cartController');
const {loginRequired, adminRequired} = require('../controllers/middleware');

const routes = (app) => {

    app.route('/api/v1/checkout').post(loginRequired, addOrder);

    app.route('/api/v1/cart').post(addToCart);
    app.route('/api/v1/cart').get(getCartInfo);
    app.route('/api/v1/getallcartinfo').get(getAllCartInfo);


}

module.exports = routes;
