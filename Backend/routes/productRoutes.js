const {addProduct, getProducts, getProductById, deleteProductById, updateProductById} = require('../controllers/productController');
const {loginRequired, adminRequired} = require('../controllers/middleware');

const routes = (app) => {

    
    app.route('/api/v1/admin/products/:id').delete(adminRequired, deleteProductById);
    app.route('/api/v1/admin/products/:id').patch(adminRequired, updateProductById);

    app.route('/api/v1/products').get(getProducts);
    app.route('/api/v1/products/:id').get(getProductById);
    


}

module.exports = routes;
