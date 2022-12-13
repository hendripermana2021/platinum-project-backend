import db from "../models/index.js";
import { Op } from "sequelize";

const Booking = db.booking;
const Ticket = db.ticket;
const Type = db.classtype;
const Flight = db.flight;
const UserBooking = db.userbooking;
const Users = db.users;
const Passanger = db.passanger;
const Payment = db.payment;
const PassangerBooking = db.passangerbooking;
const History = db.history;
const Wallet = db.wallet;
const Plane = db.plane;
export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findAll({
      include: [
        {
          model: Ticket,
          as: "ticketDeparture",
          include: [
            {
              model: Flight,
              as: "flight",
              include: [
                {
                  model: Plane,
                  as: "planename",
                },
              ],
            },
            {
              model: Type,
              as: "class",
            },
          ],
        },
        {
          model: Ticket,
          as: "ticketReturn",
          include: [
            {
              model: Flight,
              as: "flight",
              include: [
                {
                  model: Plane,
                  as: "planename",
                },
              ],
            },
            {
              model: Type,
              as: "class",
            },
          ],
        },
        {
          model: PassangerBooking,
          as: "passangerBooking",
        },
      ],
    });
    if (booking == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "booking Doesn't Existing",
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: booking,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBookingBy = async (req, res) => {
  try {
    const { search } = req.params;
    const booking = await Booking.findAll({
      include: [
        {
          model: Ticket,
          as: "ticketDeparture",
          include: [
            {
              model: Type,
              as: "class",
            },
          ],
        },
        {
          model: Ticket,
          as: "ticketReturn",
          include: [
            {
              model: Type,
              as: "class",
            },
          ],
        },
        {
          model: PassangerBooking,
          as: "passangerBooking",
        },
      ],
      where: {
        [Op.or]: [{ id: { [Op.like]: `%` + search + `%` } }],
      },
    });
    if (booking == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "booking Doesn't Existing",
      });
    }

    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: booking,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findAll({
      where: { id: req.params.id },
      include: [
        {
          model: Ticket,
          as: "ticketDeparture",
          include: [
            {
              model: Type,
              as: "class",
            },
          ],
        },
        {
          model: Ticket,
          as: "ticketReturn",
          include: [
            {
              model: Type,
              as: "class",
            },
          ],
        },
        {
          model: PassangerBooking,
          as: "passangerBooking",
          include: [
            {
              model: Passanger,
              as: "passanger",
            },
          ],
        },
      ],
    });

    if (booking == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Booking Doesn't Existing",
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: booking,
    });
  } catch (error) {
    console.log(error);
  }
};

export const softDeleteBooking = async (req, res) => {
  const { id } = req.params;
  const dataBeforeDelete = await Booking.findOne({
    where: { id: id },
  });

  const parsedDataProfile = JSON.parse(JSON.stringify(dataBeforeDelete));

  if (!parsedDataProfile) {
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Booking doesn't exist or has been deleted!",
    });
  }
  try {
    await Booking.update(
      {
        isBooking: false,
      },
      {
        where: { id: id },
      }
    );
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Booking Canceled",
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
          attributes: ["id", "firstname", "lastname"],
        },
        {
          model: Booking,
          as: "booking",
          include: [
            {
              model: Ticket,
              as: "ticketDeparture",
            },
          ],
        },
      ],
    });
    res.status(200).json({
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
  const ticket_id_departure = req.body.ticket.ticket_id_departure;
  const ticket_id_return = req.body.ticket.ticket_id_return;
  const totalPrice = req.body.ticket.totalPrice;
  const passanger = req.body.passanger;
  const passangerBulk = await Passanger.bulkCreate(passanger);

  try {
    const booking = await Booking.create({
      ticket_id_departure: ticket_id_departure,
      ticket_id_return: ticket_id_return,
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

    res.status(200).json({
      code: 200,
      status: true,
      msg: "data created",
      data: { booking, passangerBooking, passangerBulk, userbooking, payment },
    });
  } catch (error) {
    console.log(error);
  }
};

export const cancelBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findAll({
      where: {
        id: id,
      },
      include: [
        {
          model: UserBooking,
          as: "usersPayment",
          where: {
            user_id: req.user.userId,
          },
          include: [
            {
              model: Users,
              as: "users",
            },
            {
              model: Booking,
              as: "booking",
              include: [
                {
                  model: PassangerBooking,
                  as: "passangerBooking",
                  include: [
                    {
                      model: Passanger,
                      as: "passangerId",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    const history = await History.create({});

    res.status(200).json({
      code: 200,
      status: true,
      msg: "Booking Canceled",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
