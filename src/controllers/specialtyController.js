import specialtyService from '../services/specialtyService.js';

let createNewSpecialty = async (req, res) => {
    try {
        let data = req.body;
        let result = await specialtyService.createNewSpecialty(data);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            error: -1,
            message: 'Error from server...!',
        });
    }
};

let getAllSpecialty = async (req, res) => {
    try {
        let result = await specialtyService.getAllSpecialty();
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            error: -1,
            message: 'Error from server...!',
        });
    }
};

let getDetailSpecialty = async (req, res) => {
    try {
        let id = req.query.id;
        let result = await specialtyService.getDetailSpecialty(id);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            error: -1,
            message: 'Error from server...!',
        });
    }
};

export default { createNewSpecialty, getAllSpecialty, getDetailSpecialty };
