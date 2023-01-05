import db from '../models/index.cjs';

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

// let getDetailDoctorById = (inputId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (!inputId) {
//                 resolve({
//                     errCode: 1,
//                     message: 'Missing requied parameter!',
//                 });
//             } else {
//                 let data = await db.User.findOne({
//                     where: {
//                         id: inputId,
//                     },
//                     attributes: {
//                         exclude: ['password'],
//                     },
//                     include: [
//                         {
//                             model: db.Markdown,
//                             attributes: ['description', 'contentHTML', 'contentMarkdown'],
//                         },
//                         { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
//                     ],
//                     raw: false,
//                     nest: true,
//                 });
//                 if (data && data.image) {
//                     data.image = new Buffer(data.image, 'base64').toString('binary');
//                 }
//                 if (!data) data = {};
//                 resolve({
//                     errCode: 0,
//                     message: 'Ok',
//                     data: data,
//                 });
//             }
//         } catch (error) {
//             reject(error);
//         }
//     });
// };

export default { getTopDoctorHome };
