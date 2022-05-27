"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = require('../../env');
// const { databases } = require("../config");

const db = {
  schedule: null,
  status: null,
};

const sequelize = new Sequelize(
  env.mysql.DB_NAME,
  env.mysql.DB_USER,
  env.mysql.DB_PASS,
  {
    host: env.mysql.DB_HOST,
    dialect: env.mysql.DB_DIALECT,
    driver: env.mysql.DB_DRIVER,
    // dialectOptions: {
    //   useUTC: false,
    //   options: {
    //     requestTimeout: 150000,
    //   },
    // },
    timezone: "+07:00", //for writing to database
    // logging: console.log,
    logging: false,
    pool: {
      max: 200,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format("YYYY-MM-DD HH:mm:ss.SSS");
};

fs.readdirSync(__dirname)
  .filter(function (file) {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach(function (file) {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize);

    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
