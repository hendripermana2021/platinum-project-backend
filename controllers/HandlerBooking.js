import db from "../models/index.js";
import { Op } from "sequelize";
import airport from "../models/airport.js";

const Booking = db.booking;
const Ticket = db.ticket;
const Type = db.classtype;
const UserBooking = db.userbooking;
const User = db.users;
const Passanger = db.passanger;
export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findAll({
      attributes: ["id", "ticket_id", "passanger_id", "isBooking"],
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
        {
          model: Passanger,
          as: "passanger",
        },
      ],
    });
    if (booking == "") {
      return res.status(400).json({
        success: false,
        message: "booking Doesn't Existing",
      });
    }
    res.status(200).json({
      success: true,
      message: "data you searched Found",
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
          as: "ticket",
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
        success: false,
        message: "booking Doesn't Existing",
      });
    }

    res.status(200).json({
      success: true,
      message: "data you searched Found",
      data: booking,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createBooking = async (req, res) => {
  const { ticket_id, passanger_id } = req.body;
  try {
    await Booking.create({
      ticket_id,
      passanger_id,
      isBooking: true,
    });
    const booking = await Booking.findAll({
      where: {
        ticket_id: ticket_id,
        passanger_id: passanger_id,
      },
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
        {
          model: Passanger,
          as: "passanger",
        },
      ],
    });

    res.status(200).json({
      success: true,
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
      success: false,
      message: "Booking doesn't exist or has been deleted!",
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
      success: true,
      message: "Booking Canceled",
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
      success: false,
      message: "Booking not found or nothing!",
    });
  }

  await Booking.destroy({
    where: { id },
  });

  return res.status(200).json({
    success: true,
    message: "Delete Data Successfully",
  });
};

export const createUserBooking = async (req, res) => {
  const { booking_id } = req.body;
  try {
    await UserBooking.create({
      user_id: req.user.id,
      booking_id,
    });
    res.json({ msg: "Added User Booking Successfully" });
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
      success: true,
      message: "data you searched Found",
      data: userBooking,
    });
  } catch (error) {
    console.log(error);
  }
};
