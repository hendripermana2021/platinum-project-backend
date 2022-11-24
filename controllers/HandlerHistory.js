import history from "../models/history.js";
import db from "../models/index.js";

const History = db.History;
export const getHistory = async (req, res) => {
  try {
    const history = await History.findAll({
      attributes: ["id", "id_ticket", "id_users"],
    });
    res.json(history);
  } catch (error) {
    console.log(error);
  }
};
