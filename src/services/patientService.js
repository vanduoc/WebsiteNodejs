import { v4 as uuidv4 } from 'uuid';
import db from '../models/index.cjs';
import emailService from './emailService.js';

let buildUrlEmail = (doctorId, token) => {
    let result = '';
    if (doctorId && token) {
        result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
    }
    return result;
};
let saveBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || !data.fullName || !data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: -1,
                    message: 'Missing required parameter...',
                });
            } else {
                let token = uuidv4();
                let doctorId = data.doctorId;
                let redirectLink = buildUrlEmail(doctorId, token);

                let user = await db.User.findOrCreate({
                    where: {
                        email: data.email,
                    },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                    },
                });
                if (user && user[0]) {
                    let BookingAppointment = await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id,
                            statusId: ['S1', 'S2'],
                        },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            token: token,
                            date: data.date,
                            timeType: data.timeType,
                        },
                    });

                    let isExistBookingAppointment = BookingAppointment[1];
                    if (isExistBookingAppointment) {
                        resolve({
                            errCode: 0,
                            message: 'Appoiment has been created Successfully!',
                        });
                        // Send mail
                        await emailService.sendSimpleEmail({
                            patientName: data.fullName,
                            doctorName: data.doctorName,
                            reciverEmail: data.email,
                            time: data.timeString,
                            language: data.language,
                            redirectLink: redirectLink,
                        });
                    } else {
                        resolve({
                            errCode: 1,
                            message: 'You already have an appointment!',
                        });
                    }
                }
                resolve({
                    errCode: 1,
                    message: 'Error from server...!',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || !data.doctorId || !data.token) {
                resolve({
                    errCode: -1,
                    message: 'Missing required parameter...',
                });
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                    },
                    raw: false,
                });
                if (appointment) {
                    if (appointment.statusId === 'S1') {
                        appointment.statusId = 'S2';
                        await appointment.save();
                    } else {
                        if (appointment.statusId === 'S2') {
                            resolve({
                                errCode: 0,
                                message: 'The appointment vefified Success!',
                            });
                        } else {
                            resolve({
                                errCode: 0,
                                message: 'The appointment has been completed or canceled!',
                            });
                        }
                    }
                } else {
                    resolve({
                        errCode: 2,
                        message: 'The appointment does not exist!',
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

export default { saveBookAppointment, postVerifyBookAppointment };
