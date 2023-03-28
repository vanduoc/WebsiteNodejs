import db from '../models/index.cjs';

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
            resolve({
                errCode: 0,
                message: 'OK',
                data: data ? data : [],
            });
        } catch (error) {
            reject(error);
        }
    });
};

let createNewClinic = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || !data.name || !data.provinceId) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameter...!',
                });
            } else {
                let clinic = await db.Clinic.findOrCreate({
                    where: {
                        name: data.name,
                        provinceId: data.provinceId,
                    },
                    defaults: {
                        name: data.name,
                        address: data.address,
                        provinceId: data.provinceId,
                        descriptionMarkdown: data.descriptionMarkdown,
                        descriptionHTML: data.descriptionHTML,
                        image: data.image,
                    },
                });
                let isAlreadyExistClinic = clinic[1];
                if (isAlreadyExistClinic) {
                    resolve({
                        errCode: 0,
                        message: 'Create the Clinic success!',
                    });
                } else {
                    resolve({
                        errCode: 2,
                        message: 'The Clinic already exist, plz try create another Clinic!',
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getDetailClinicById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: -1,
                    message: 'Missing required parameter...',
                });
            } else {
                console.log('check id', id);
                let data = await db.Clinic.findOne({
                    where: {
                        id: id,
                    },
                    raw: false,
                    nest: false,
                    include: [{ model: db.Doctor_infor, as: 'clinicData', attributes: ['doctorId'] }],
                });

                if (data && data.image) {
                    data.image = new Buffer.from(data.image, 'base64').toString('binary');
                }

                if (!data) {
                    resolve({
                        errCode: 1,
                        message: 'Clinic not found...',
                    });
                }
                resolve({
                    errCode: 0,
                    message: 'Ok',
                    data: data,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

export default {
    getAllClinic,
    createNewClinic,
    getDetailClinicById,
};
