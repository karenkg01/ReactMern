const {login, register, editProfile, createProfile, getProfile, getAllUserInfo, deleteImageProfile} = require ('../controllers/userController');
const {loginRequired, adminRequired} = require('../controllers/middleware');

const routes = (app) => {

    //registration route
    app.route('/api/v1/users/register').post(register);
    app.route('/api/v1/users/login').post(login);

    app.route('/api/v1/profile').post( createProfile);
    app.route('/api/v1/profile/image').delete(loginRequired, deleteImageProfile);
    app.route('/api/v1/profile/address').post(loginRequired, editProfile);
    app.route('/api/v1/profile').get(loginRequired, getProfile);

    app.route('/api/v1/getalluserinfo').get(getAllUserInfo);



    

    // app.route('/admin').get(loginRequired, getUsers);
    // app.route('/admin/:id').put(loginRequired, changeAdmin);
    // app.route('/admin/:id').delete(loginRequired, deleteUser);
    // app.route('/admin/:id').get(loginRequired, getUsersWithId);

}

module.exports = routes;
