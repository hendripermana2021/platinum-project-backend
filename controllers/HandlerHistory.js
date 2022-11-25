import db from "../models/index.js";

const History = db.history;
const Users = db.users;
const Ticket = db.ticket;
export const getHistory = async (req, res) => {
  try {
    const history = await History.findAll({
      attributes: ["id", "id_ticket", "id_users", "createdAt"],
      include: [
        {
          model: Users,
          as: "users",
          attributes: ["id", "firstname", "lastname"],
        },
        {
          model: Ticket,
          as: "tickets",
          attributes: ["id", "arrival_id", "departure_date"],
        },
      ],
    });
    res.json(history);
  } catch (error) {
    console.log(error);
  }
};

export const getHistoryById = async (req, res) => {
  try {
    const history = await History.findOne({
      where: { id: req.params.id },
      attributes: ["id", "id_ticket", "id_users", "createdAt"],
      include: [
        {
          model: Users,
          as: "users",
          attributes: ["id", "firstname", "lastname"],
        },
        {
          model: Ticket,
          as: "tickets",
          attributes: ["id", "arrival_id", "departure_date"],
        },
      ],
    });
    res.status(200).json(history);
  } catch (error) {
    console.log(error);
  }
};
