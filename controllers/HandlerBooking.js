import db from "../models/index.js";

const Booking = db.booking;
const Ticket = db.ticket;
const Type = db.classtype;
export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findAll({
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
    });
    res.status(200).json(booking);
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
    res.json({ msg: "Added Booking Successfully" });
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
