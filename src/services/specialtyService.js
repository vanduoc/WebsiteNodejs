import db from '../models/index.cjs';
let createNewSpecialty = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || !data.name) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameter...!',
                });
            } else {
                let specialty = await db.Specialty.findOrCreate({
                    where: {
                        name: data.name,
                    },
                    defaults: {
                        name: data.name,
                        descriptionMarkdown: data.descriptionMarkdown,
                        descriptionHTML: data.descriptionHTML,
                        image: data.image,
                    },
                });
                let isAlreadyExistSpecialty = specialty[1];
                if (isAlreadyExistSpecialty) {
                    resolve({
                        errCode: 0,
                        message: 'Create the specialty success!',
                    });
                } else {
                    resolve({
                        errCode: 2,
                        message: 'The Specialty already exist, plz try create another specialty!',
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getAllSpecialty = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allSpecialty = await db.Specialty.findAll({
                // order: [['createdAt', 'DESC']] ,
                order: [['createdAt']],
                attributes: ['id', 'name', 'image'],
            });
            resolve({
                errCode: 0,
                message: 'OK',
                data: allSpecialty,
            });
        } catch (error) {
            reject(error);
        }
    });
};

let getDetailSpecialty = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameter...',
                });
            } else {
                let result = await db.Specialty.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                    include: [
                        {
                            model: db.Doctor_infor,
                            as: 'doctorData',
                            attributes: ['doctorId', 'provinceId'],
                        },
                    ],
                    raw: false,
                    nest: false,
                });
                if (result && result.image) {
                    result.image = new Buffer.from(result.image, 'base64').toString('binary');
                }
                if (!result) {
                    resolve({
                        errCode: 1,
                        message: 'Specialty not found...',
                    });
                }
                resolve({
                    errCode: 0,
                    message: 'OK',
                    data: result ? result : {},
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

export default {
    createNewSpecialty,
    getAllSpecialty,
    getDetailSpecialty,
};
