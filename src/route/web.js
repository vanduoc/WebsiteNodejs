import express from 'express';
import homeController from '../controllers/homeController.js';
import userController from '../controllers/userController.js';
import doctorController from '../controllers/doctorController.js';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/allcode', userController.getAllCode);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    router.get('/api/get-infor-doctor-by-id', doctorController.getInforDoctorById);
    router.post('/api/save-infor-doctor', doctorController.saveInforDoctor);
    router.post('/api/bulk-create-schedule', doctorController.saveBulkCreateSchedule);

    return app.use('/', router);
};

export default initWebRoutes;
