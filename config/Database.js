import { Sequelize } from "sequelize";

const db = new Sequelize("railway", "root", "dBMapj78ChpmemOVqV4c", {
  host: "containers-us-west-67.railway.app",
  dialect: "mysql",
  url: "mysql://root:dBMapj78ChpmemOVqV4c@containers-us-west-67.railway.app:6993/railway",
  port: "6993",
});

export default db;
