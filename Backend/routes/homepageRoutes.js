
const {getBanner, getCategories, getProducts, getAllCategories} = require('../controllers/homepageController');


const routes = (app) => {


    app.route('/api/v1/homepage/banner').get(getBanner);
    app.route('/api/v1/homepage/categories').get(getCategories);
    app.route('/api/v1/homepage/allcategories').get(getAllCategories);
    app.route('/api/v1/homepage/products').get(getProducts);

    

}

module.exports = routes;
