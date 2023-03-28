import express from 'express';
import homeController from '../controllers/homeController.js';
import userController from '../controllers/userController.js';
import doctorController from '../controllers/doctorController.js';
import patientController from '../controllers/patientController.js';
import specialtyController from '../controllers/specialtyController.js';
import clinicController from '../controllers/clinicController.js';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    router.post('/put-crud', homeController.putCRUD);

    router.get('/api/allcode', userController.getAllCode);
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
    router.get('/api/get-schedule-by-date', doctorController.getScheduleDoctorByDate);
    router.get('/api/get-doctor-extra-infor', doctorController.getExtraInforDoctor);
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);
    router.post('/api/patient-book-appointment', patientController.saveBookAppointment);
    router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment);
    router.post('/api/create-new-specialty', specialtyController.createNewSpecialty);
    router.post('/api/create-new-clinic', clinicController.createNewClinic);
    router.get('/api/get-specialty', specialtyController.getAllSpecialty);
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialty);
    router.get('/api/get-clinic', clinicController.getAllClinic);
    router.get('/api/get-old-doctor-extra-info', doctorController.getOldDoctorExtraInfo);
    router.get('/api/get-detail-clinic', clinicController.getDetailClinic);

    return app.use('/', router);
};

export default initWebRoutes;
