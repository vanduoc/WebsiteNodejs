import clinicService from '../services/clinicService.js';

let getAllClinic = async (req, res) => {
    try {
        let result = await clinicService.getAllClinic();
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...',
        });
    }
};

let createNewClinic = async (req, res) => {
    try {
        let data = req.body;
        let result = await clinicService.createNewClinic(data);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(200).json({
            error: -1,
            message: 'Error from server...!',
        });
    }
};

let getDetailClinic = async (req, res) => {
    try {
        let id = req.query.id;
        let result = await clinicService.getDetailClinicById(id);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            error: -1,
            message: 'Error from server...!',
        });
    }
};

export default { getAllClinic, createNewClinic, getDetailClinic };
