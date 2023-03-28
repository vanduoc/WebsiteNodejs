import patientService from '../services/patientService.js';

let saveBookAppointment = async (req, res) => {
    try {
        let data = req.body;
        let respone = await patientService.saveBookAppointment(data);
        return res.status(200).json(respone);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server...',
        });
    }
};

let postVerifyBookAppointment = async (req, res) => {
    try {
        let data = req.body;
        let result = await patientService.postVerifyBookAppointment(data);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server...',
        });
    }
};

export default { saveBookAppointment, postVerifyBookAppointment };
