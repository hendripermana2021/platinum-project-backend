import { Sequelize } from "sequelize";
const { DB_URI } = process.env;

const db = new Sequelize("BEProject", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  url: DB_URI,
});

export default db;
