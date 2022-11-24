import db from "../models/index.js";
import users from "../models/users.js";
import { Sequelize } from "sequelize";

const Booking = db.booking;
const Users = db.users;
const Ticket = db.ticket;
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
        {
          model: Ticket,
          as: "tickets",
          attributes: ["id", "arrival_id", "departure_date"],
        },
        {
          model: Airport,
          as: "airports",
          attributes: [
            "id",
            "name_airport",
            "code_airport",
            "address",
            "city_airport",
          ],
        },
      ],
    });
    res.json(booking);
  } catch (error) {
    console.log(error);
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: { id: req.params.id },
      attributes: ["id", "id_ticket", "id_users", "id_airport", "isBooking"],
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
        {
          model: Airport,
          as: "airports",
          attributes: [
            "id",
            "name_airport",
            "code_airport",
            "address",
            "city_airport",
          ],
        },
      ],
    });
    res.status(200).json(booking);
  } catch (error) {
    console.log(error);
  }
};
