import db from "../models/index.js";

const History = db.history;
const Users = db.users;
const Ticket = db.ticket;
const UserBooking = db.userbooking;
export const getHistoryPayment = async (req, res) => {
  const reqUserId = req.user.userId;
  const { condition } = req.params;
  try {
    const history = await History.findAll({
      where: { isHistory: condition },
      include: [
        {
          model: UserBooking,
          as: "userBooking",
          where: { user_id: reqUserId },
        },
      ],
    });

    if (history == "") {
      return res.status(400).json({
        code: 400,
        status: true,
        msg: "you don't have history payment",
      });
    }
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "you don't have history payment",
      data: history,
    });
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
    return res.status(200).json(history);
  } catch (error) {
    console.log(error);
  }
};
