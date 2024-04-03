"use strict";
const dbConfig = require("../config/config.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};

db.Room = require("./Room.js")(sequelize, DataTypes);
db.Role = require("./Role.js")(sequelize, DataTypes);
db.Guest = require("./Guest.js")(sequelize, DataTypes);
db.Staff = require("./Staff.js")(sequelize, DataTypes);
db.Booking = require("./Booking.js")(sequelize, DataTypes);
db.Bookingdetail = require("./BookingDetail.js")(sequelize, DataTypes);
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
sequelize.sync({ force: true }).then(() => console.log("sync done"));
module.exports = db;
