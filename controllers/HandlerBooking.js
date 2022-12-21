import db from "../models/index.js";
import { Op } from "sequelize";

const Booking = db.booking;
const UserBooking = db.userbooking;
const Users = db.users;
const Passanger = db.passanger;
const Payment = db.payment;
const PassangerBooking = db.passangerbooking;
const Notification = db.notification;

export const getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const userBooking = await UserBooking.findOne({
      where: { id },
      attributes: ["user_id", "booking_id"],
      include: [
        {
          model: Users,
          as: "users",
          attributes: ["id", "firstname", "lastname", "email"],
        },
        {
          model: Booking,
          as: "booking",
          include: {
            all: true,
            include: { all: true },
          },
        },
      ],
    });

    if (userBooking == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Booking Doesn't Existing",
      });
    }
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: userBooking,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserBooking = async (req, res) => {
  try {
    const userBooking = await UserBooking.findAll({
      attributes: ["user_id", "booking_id"],
      include: [
        {
          model: Users,
          as: "users",
          attributes: ["id", "firstname", "lastname", "email"],
        },
        {
          model: Booking,
          as: "booking",
          include: { all: true },
        },
      ],
    });
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: userBooking,
    });
  } catch (error) {
    console.log(error);
  }
};

export const actionBooking = async (req, res) => {
  const getUserId = req.user_userId;
  const ticket_id_departure = req.body.ticket.ticket_id_departure;
  const ticket_id_return = req.body.ticket.ticket_id_return;
  const totalPrice = req.body.ticket.totalPrice;
  const passanger = req.body.passanger;
  const passangerBulk = await Passanger.bulkCreate(passanger);

  try {
    const booking = await Booking.create({
      ticket_id_departure: ticket_id_departure,
      ticket_id_return: ticket_id_return,
      totalPassanger: passanger.length,
      isBooking: false,
    });

    const passangerBookingData = passangerBulk.map((data) => ({
      idPassanger: data.id,
      idBooking: booking.id,
    }));

    const passangerBooking = await PassangerBooking.bulkCreate(
      passangerBookingData
    );

    const userbooking = await UserBooking.create({
      user_id: req.user.userId,
      booking_id: booking.id,
    });

    const payment = await Payment.create({
      userBooking_id: userbooking.id,
      totalPrice: totalPrice,
      isPayed: false,
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data created",
      data: {
        booking,
        passangerBooking,
        passangerBulk,
        userbooking,
        payment,
        // notif,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
