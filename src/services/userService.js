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
                    attributes: ['email', 'password', 'roleId'],
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
            }
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                image: data.image,
                roleId: data.roleId,
                positionId: data.positionId,
            });
            resolve({
                errCode: 0,
                message: 'OK',
            });
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
            let userId = data.id;
            if (userId) {
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
                    await db.User.update(
                        {
                            firstName: data.firstName,
                            lastName: data.lastName,
                            address: data.address,
                            phoneNumber: data.phoneNumber,
                            gender: data.gender,
                            roleId: data.roleId,
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
            } else {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameter!',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

export default { handleUserLogin, getAllUsers, createNewUser, deleteUser, updateUserData };