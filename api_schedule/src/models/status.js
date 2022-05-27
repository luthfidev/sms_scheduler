'use strict';
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('status', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        schedule_id: DataTypes.INTEGER,
        messageId: DataTypes.STRING,
        status: DataTypes.STRING,
        delivery_time: DataTypes.STRING
    }, {
        tableName: 'status',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: false,
    });
};