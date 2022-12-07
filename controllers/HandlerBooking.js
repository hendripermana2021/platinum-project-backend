import db from "../models/index.js";
import { Op } from "sequelize";

const Booking = db.booking;
const Ticket = db.ticket;
const Type = db.classtype;
const UserBooking = db.userbooking;
const User = db.users;
const Passanger = db.passanger;
const Payment = db.payment;
const PassangerBooking = db.passangerbooking;
export const getBooking = async (req, res) => {
  try {
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
          model: Passanger,
          as: "passanger",
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
    const { search } = await req.params;
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
          model: Passanger,
          as: "passanger",
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
          model: Passanger,
          as: "passanger",
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

export const createBooking = async (req, res) => {
  const { ticket_id_departure, ticket_id_return, totalPassanger } = req.body;
  try {
    await Booking.create({
      ticket_id_departure,
      ticket_id_return,
      totalPassanger,
      isBooking: false,
    });
    const booking = await Booking.findAll({
      where: {
        createdAt: Date.now(),
      },
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
          model: Passanger,
          as: "passanger",
        },
      ],
    });

    res.status(200).json({
      code: 200,
      status: true,
      msg: "Added Booking Successfully",
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

export const deleteBooking = async (req, res) => {
  const booking = await Booking.findAll();
  const { id } = req.params;
  const dataBefore = await Booking.findOne({
    where: { id: id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBefore));

  if (!parsedDataProfile) {
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Booking not found or nothing!",
    });
  }

  await Booking.destroy({
    where: { id },
  });

  return res.status(200).json({
    code: 200,
    status: true,
    msg: "Delete Data Successfully",
  });
};

export const createUserBooking = async (req, res) => {
  const { booking_id } = req.body;
  try {
    await UserBooking.create({
      user_id: req.user.userId,
      booking_id,
    });

    const userBooking = await UserBooking.findAll({
      where: { user_id: user_id, booking_id: booking_id },
      include: [
        {
          model: User,
          as: "user",
        },
        {
          model: Booking,
          as: "booking",
          include: [
            {
              model: Ticket,
              as: "ticket",
              include: [
                {
                  model: Type,
                  as: "class",
                },
              ],
            },
          ],
        },
      ],
    });

    res.status(201).json({
      code: 201,
      status: true,
      msg: "Added User Booking Successfully",
      data: Booking,
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
          model: User,
          as: "user",
          attributes: ["user_id", "firstname", "lastname"],
        },
        {
          model: Booking,
          as: "booking",
          attributes: ["ticket_id", "passanger_id", "isBooking"],
          include: [
            {
              model: Ticket,
              as: "ticket",
              attributes: [
                "flight_id",
                "class_id",
                "price",
                "country",
                "passanger_ammount",
              ],
              include: [
                {
                  model: Type,
                  as: "class",
                },
              ],
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
  // const { ticket_id_departure, ticket_id_return } = req.body;
  const ticket_id_departure = req.body.ticket_id_departure;
  const ticket_id_return = req.body.ticket_id_return;
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
    res.status(200).json({
      code: 200,
      msg: "data created",
    });
  } catch (error) {}
};
