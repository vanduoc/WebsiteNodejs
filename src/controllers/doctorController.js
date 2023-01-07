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

export default { getTopDoctorHome, getAllDoctors, saveInforDoctor, getInforDoctorById };
