import db from "../models/index.js";
const sequelize = db.sequelize;
import { QueryTypes } from "sequelize";

export const getBookingbyUsersId = async (req, res) => {
  try {
    const getDataByUserId = req.user.userId;
    const sql = `SELECT * FROM UserBookings ub JOIN Bookings b on ub.booking_id = b.id JOIN Tickets t on b.ticket_id_departure = t.id OR b.ticket_id_return = t.id WHERE user_id = ${getDataByUserId}`;
    const replacements = {};
    const userbooking = await sequelize.query(sql, {
      replacements,
      type: QueryTypes.SELECT,
      raw: true,
    });

    if (userbooking == "") {
      return res.status(400).json({
        code: 400,
        status: true,
        msg: "You Dont Have Booking Now, Please Booking now",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Booking you have",
      data: userbooking,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllBooking = async (req, res) => {
  try {
    const sql = `SELECT * FROM userbookings ub JOIN bookings b on ub.booking_id = b.id JOIN tickets t on b.ticket_id_departure = t.id OR b.ticket_id_return = t.id `;
    const replacements = {};
    const userbooking = await sequelize.query(sql, {
      replacements,
      type: QueryTypes.SELECT,
      raw: true,
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Users Booking Now",
      data: userbooking,
    });
  } catch (error) {
    console.log(error);
  }
};
