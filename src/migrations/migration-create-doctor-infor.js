'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('doctor_infor', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            doctorId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            priceId: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            provinceId: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            paymentId: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            specialtyId: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            clinicId: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            note: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            count: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('doctor_infor');
    },
};
