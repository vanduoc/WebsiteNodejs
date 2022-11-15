'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                email: 'admin@gmail.com',
                password: '123456', //plain text --> sfdsfasdfsdgf12234 : hash password
                firstName: 'Duoc',
                lastName: 'Huynh van',
                address: 'Ho Chi Minh',
                gender: 1,
                typeRole: 'ROLE',
                keyRole: 'R1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    },
};
