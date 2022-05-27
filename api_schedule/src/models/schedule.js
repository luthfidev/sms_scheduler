'use strict';
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('schedule', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        schedule: DataTypes.STRING,
        dnis: DataTypes.STRING,
        message: DataTypes.STRING,
    }, {
        tableName: 'schedule',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: false,
    });
};