import { Sequelize } from "sequelize";

const db = new Sequelize("railway", "root", "zc7yB6TdpGHafC7T43aq", {
  host: "containers-us-west-43.railway.app",
  dialect: "mysql",
  url: "mysql://root:zc7yB6TdpGHafC7T43aq@containers-us-west-43.railway.app:5734/railway",
  port: "5734",
});

export default db;
