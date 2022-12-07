import bcrypt from 'bcryptjs';
import db from '../models/index.cjs';

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
                    userData.errMessage = `Your's email isn't exist or deleted. plz try other email!`;
                    resolve(userData);
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in our's system. plz try other email!`;
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

export default { handleUserLogin, getAllUsers };
