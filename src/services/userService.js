import bcrypt from 'bcryptjs';
import db from '../models/index.cjs';

var salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExistUser = await checkUserEmail(email);
            if (isExistUser) {
                //user already exist

                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'roleId', 'firstName', 'lastName'],
                    where: {
                        email: email,
                    },
                });

                if (user) {
                    //compare password
                    let userPassword = user.password;
                    let checkPassword = await bcrypt.compareSync(password, userPassword);
                    if (checkPassword) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        delete user.password;
                        userData.user = user;
                        resolve(userData);
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                        resolve(userData);
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `Your's email isn't exist or deleted. plz try another email!`;
                    resolve(userData);
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in our's system. plz try another email!`;
                resolve(userData);
            }
        } catch (error) {
            reject(error);
        }
    });
};

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail,
                },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users;
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    attributes: {
                        exclude: ['password'],
                    },
                    where: {
                        id: userId,
                    },
                });
            }
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    },
                });
            }
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already exist, plz try another email!!!',
                });
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    image: data.image,
                    roleId: data.roleId,
                    positionId: data.positionId,
                });
                resolve({
                    errCode: 0,
                    message: 'OK',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};

let deleteUser = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: inputId,
                },
                raw: false,
            });
            if (!user) {
                resolve({
                    errCode: 2,
                    message: "The user isn't exist",
                });
            } else {
                await user.destroy();
                resolve({
                    errCode: 0,
                    message: 'The user is deleted!',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id && !data.roleId && !data.gender && !data.positionId) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameter!',
                });
            } else {
                let user = await db.User.findOne({
                    where: {
                        id: data.id,
                    },
                });
                if (!user) {
                    resolve({
                        errCode: 2,
                        message: "The user isn't exist!",
                    });
                } else {
                    if (data.image) {
                        await db.User.update(
                            {
                                firstName: data.firstName,
                                lastName: data.lastName,
                                address: data.address,
                                phoneNumber: data.phoneNumber,
                                gender: data.gender,
                                roleId: data.roleId,
                                positionId: data.positionId,
                                image: data.image,
                            },
                            {
                                where: {
                                    id: data.id,
                                },
                            },
                        );
                    } else
                        await db.User.update(
                            {
                                firstName: data.firstName,
                                lastName: data.lastName,
                                address: data.address,
                                phoneNumber: data.phoneNumber,
                                gender: data.gender,
                                roleId: data.roleId,
                                positionId: data.positionId,
                            },
                            {
                                where: {
                                    id: data.id,
                                },
                            },
                        );
                    resolve({
                        errCode: 0,
                        message: 'Update the user succeeds',
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameter!!',
                });
            } else {
                let res = {};
                let allCode = await db.Allcode.findAll({
                    where: {
                        type: typeInput,
                    },
                });
                res.errCode = 0;
                res.message = 'OK';
                res.data = allCode;
                resolve(res);
            }
        } catch (error) {
            reject(e);
        }
    });
};

export default { handleUserLogin, getAllUsers, createNewUser, deleteUser, updateUserData, getAllCodeService };
