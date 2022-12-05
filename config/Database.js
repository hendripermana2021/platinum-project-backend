const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_USER1 = "postgres",
  DB_PASSWORD1 = "1",
  DB_NAME1 = "challange8",
  DB_HOST1 = "127.0.0.1",
  DB_PORT1 = "5432",
  DB_URI,
} = process.env;

module.exports = {
  development: {
    username: DB_USER1,
    password: DB_PASSWORD1,
    database: `${DB_NAME1}_development`,
    host: DB_HOST1,
    port: DB_PORT1,
    dialect: "postgres",
  },
  test: {
    username: DB_USER1,
    password: DB_PASSWORD1,
    database: `${DB_NAME1}_development`,
    host: DB_HOST1,
    port: DB_PORT1,
    dialect: "postgres",
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    url: DB_URI,
    dialect: "mysql",
  },
};

// import { Sequelize } from "sequelize";

// const db = new Sequelize("railway", "root", "zc7yB6TdpGHafC7T43aq", {
//   host: "containers-us-west-43.railway.app",
//   dialect: "mysql",
//   url: "mysql://root:zc7yB6TdpGHafC7T43aq@containers-us-west-43.railway.app:5734/railway",
//   port: "5734",
// });

// export default db;
