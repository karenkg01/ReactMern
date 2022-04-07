
const {getOrders, updateOrder} = require('../controllers/orderController');
const {loginRequired, adminRequired} = require('../controllers/middleware');

const routes = (app) => {

    app.route('/api/v1/orders').get(loginRequired,getOrders);
    // app.route('/api/v1/orders/:id').patch(adminRequired, updateOrderById);
    // app.route('/api/v1/admin/orders/:id').patch(adminRequired, updateOrder);


}

module.exports = routes;
