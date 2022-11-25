"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require("../models/users.js")(sequelize, Sequelize);
db.booking = require("../models/booking.js")(sequelize, Sequelize);
db.airport = require("../models/airport.js")(sequelize, Sequelize);
db.ticket = require("../models/ticket.js")(sequelize, Sequelize);
db.wishlist = require("../models/wishlist.js")(sequelize, Sequelize);
db.history = require("../models/history.js")(sequelize, Sequelize);

//RELATION FOR BOOKING
db.users.belongsTo(db.booking, {
  as: "bookings",
  foreignKey: "id",
});

db.booking.belongsTo(db.users, {
  as: "users",
  foreignKey: "id",
});

db.ticket.belongsTo(db.booking, {
  as: "bookings",
  foreignKey: "id_ticket",
});

db.booking.belongsTo(db.ticket, {
  as: "tickets",
  foreignKey: "id",
});

// db.airport.belongsTo(db.booking, {
//   as: "bookings",
//   foreignKey: "id_airport",
// });

db.booking.belongsTo(db.airport, {
  as: "airports",
  foreignKey: "id",
});

//RELATION FOR WISHLIST
db.wishlist.belongsTo(db.ticket, {
  as: "tickets",
  foreignKey: "id",
});

db.ticket.belongsTo(db.wishlist, {
  as: "wishlists",
  foreignKey: "id_ticket",
});

db.wishlist.belongsTo(db.users, {
  as: "users",
  foreignKey: "id",
});

db.users.belongsTo(db.wishlist, {
  as: "wishlists",
  foreignKey: "id",
});

//RELATION FOR HISTORY
db.history.belongsTo(db.ticket, {
  as: "tickets",
  foreignKey: "id",
});

db.ticket.belongsTo(db.history, {
  as: "histories",
  foreignKey: "id_ticket",
});

db.history.belongsTo(db.users, {
  as: "users",
  foreignKey: "id",
});

db.users.belongsTo(db.history, {
  as: "histories",
  foreignKey: "id",
});

module.exports = db;
