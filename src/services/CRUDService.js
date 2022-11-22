import bcrypt from 'bcryptjs';
import db from '../models/index.cjs';
var salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            console.log('hashPasswordFromBcrypt' + hashPasswordFromBcrypt);
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
            resolve('create a new user success');
        } catch (error) {
            reject(error);
        }
    });
};

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            console.log('Vaò hashUserPassword');
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};

export default { createNewUser };
