import doctorService from '../services/doctorService.js';

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...',
        });
    }
};

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            erroCode: -1,
            message: 'Error from server...',
        });
    }
};

let saveInforDoctor = async (req, res) => {
    try {
        let data = req.body;
        let respone = await doctorService.saveInforDoctor(data);
        res.status(200).json(respone);
    } catch (error) {
        console.log(error);
        res.status(200).json({
            errCode: -1,
            message: 'Error from server...',
        });
    }
};

let getInforDoctorById = async (req, res) => {
    try {
        let id = req.query.id;
        let respone = await doctorService.getDetailDoctorById(id);
        return res.status(200).json(respone);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...',
        });
    }
};

let saveBulkCreateSchedule = async (req, res) => {
    try {
        let data = req.body;
        let respone = await doctorService.bulkCreateSchedule(data);
        return res.status(200).json(respone);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server...',
        });
    }
};

let getScheduleDoctorByDate = async (req, res) => {
    try {
        let doctorId = req.query.doctorId;
        let date = req.query.date;
        let respone = await doctorService.getScheduleDoctorByDate(doctorId, date);
        res.status(200).json(respone);
    } catch (error) {
        console.log(error);
        res.status(200).json({
            errCode: -1,
            message: 'Error from the server...',
        });
    }
};

let getExtraInforDoctor = async (req, res) => {
    try {
        let doctorId = req.query.id;
        let result = await doctorService.getExtraInforDoctor(doctorId);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server...',
        });
    }
};

let getProfileDoctorById = async (req, res) => {
    try {
        let doctorId = req.query.id;
        let respone = await doctorService.getProfileDoctorByid(doctorId);
        return res.status(200).json(respone);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server...',
        });
    }
};

let getOldDoctorExtraInfo = async (req, res) => {
    try {
        let doctorId = req.query.id;
        let respone = await doctorService.getOldDoctorExtraInfo(doctorId);
        return res.status(200).json(respone);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server...',
        });
    }
};

export default {
    getTopDoctorHome,
    getAllDoctors,
    saveInforDoctor,
    getInforDoctorById,
    saveBulkCreateSchedule,
    getScheduleDoctorByDate,
    getProfileDoctorById,
    getExtraInforDoctor,
    getOldDoctorExtraInfo,
};
