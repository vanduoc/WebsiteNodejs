import express from 'express';
import homeController from '../controllers/homeController.js';
import userController from '../controllers/userController.js';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    router.post('/put-crud', homeController.putCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);

    return app.use('/', router);
};

export default initWebRoutes;
