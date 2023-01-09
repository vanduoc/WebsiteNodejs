import db from '../models/index.cjs';
import dotenv from 'dotenv';
import _ from 'lodash';
dotenv.config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                where: {
                    roleId: 'R2',
                },
                limit: limit,
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password'],
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true,
            });
            resolve({
                errCode: 0,
                data: users,
            });
        } catch (error) {
            reject(error);
        }
    });
};

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: {
                    roleId: 'R2',
                },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password', 'image'],
                },
            });
            resolve({
                errCode: 0,
                data: doctors,
            });
        } catch (error) {
            reject(error);
        }
    });
};

let saveInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inputData && inputData.doctorId && inputData.contentHTML && inputData.contentMarkdown) {
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    doctorId: inputData.doctorId,
                });
                resolve({
                    errCode: 0,
                    message: 'OK',
                });
            } else
                resolve({
                    errCode: -1,
                    message: 'Missing required parmeter!',
                });
        } catch (error) {
            reject(error);
        }
    });
};

let getDetailDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    message: 'Missing requied parameter!',
                });
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: {
                        exclude: ['password'],
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown'],
                        },
                        {
                            model: db.Allcode,
                            as: 'positionData',
                            attributes: ['valueVi', 'valueEn'],
                        },
                    ],
                    raw: false,
                    nest: true,
                });
                if (data && data.image) {
                    data.image = new Buffer.from(data.image, 'base64').toString('binary');
                }
                if (!data) {
                    resolve({
                        errCode: 1,
                        message: 'User not found...',
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

let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data && data.length > 0) {
                let toCreate = [];
                let schedule = data.map((item) => ({
                    maxNumber: MAX_NUMBER_SCHEDULE,
                    date: item.date,
                    timeType: item.timeType,
                    doctorId: item.doctorId,
                }));
                for (let item of schedule) {
                    let existing = await db.Schedule.findOne({
                        where: {
                            doctorId: item.doctorId,
                            date: item.date,
                            timeType: item.timeType,
                        },
                        attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    });
                    if (!existing) toCreate = [...toCreate, item];
                    // Hàm check Sự khác nhau giữa 2 mảng trả về 1 mảng mới gồm các item khác nhau
                    // toCreate = _.differenceBy(schedule, existing, (a, b) => {
                    // return  a.timeType === b.timeType && a.date == b.date;
                    // });
                }
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                    resolve({
                        errCode: 0,
                        message: 'OK',
                    });
                }
            } else {
                resolve({
                    errCode: -1,
                    message: 'Invalid input data',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

export default { getTopDoctorHome, getAllDoctors, saveInforDoctor, getDetailDoctorById, bulkCreateSchedule };
