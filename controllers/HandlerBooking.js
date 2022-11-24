import db from "../models/index.js";
import users from "../models/users.js";
import { Sequelize } from "sequelize";

const Booking = db.booking;
const Users = db.users;
const Airport = db.airport;
export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findAll({
      attributes: ["id", "id_ticket", "id_users", "id_airport", "isBooking"],
      include: [
        {
          model: Users,
          as: "users",
          attributes: ["id", "firstname", "lastname"],
        },
      ],
    });
    res.json(booking);
  } catch (error) {
    console.log(error);
  }
};
