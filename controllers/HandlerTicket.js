import db from "../models/index.js";
import userbooking from "../models/userbooking.js";

const Ticket = db.ticket;
const Type = db.classtype;
const Flight = db.flight;
const Airport = db.airport;
const Booking = db.booking;
const UserBooking = db.userbooking;
export const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findAll({
      include: [
        {
          model: Type,
          as: "class",
          attributes: ["type"],
        },
        {
          model: Flight,
          as: "flight",
          include: [
            {
              model: Airport,
              as: "DepartureTerminal",
            },
            {
              model: Airport,
              as: "ArrivalTerminal",
            },
          ],
        },
      ],
    });
    res.status(200).json({
      success: true,
      message: "ticket you searched Found",
      data: ticket,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Type,
          as: "class",
          attributes: ["type"],
        },
        {
          model: Flight,
          as: "flight",
          include: [
            {
              model: Airport,
              as: "DepartureTerminal",
            },
            {
              model: Airport,
              as: "ArrivalTerminal",
            },
          ],
        },
      ],
    });
    res.status(200).json({
      success: true,
      message: "Ticket Found",
      data: ticket,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createTicket = async (req, res) => {
  const { flight_id, class_id, price, country, passanger_ammount } = req.body;
  try {
    await Ticket.create({
      flight_id,
      class_id,
      price,
      country,
      passanger_ammount,
    });

    const ticket = await Ticket.findAll({
      where: {
        flight_id: flight_id,
        class_id: class_id,
        price: price,
        country: country,
        passanger_ammount: passanger_ammount,
      },
    });

    res.status(200).json({
      success: true,
      msg: "Added Ticket Successfully",
      data: ticket,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTicket = async (req, res) => {
  const ticket = await Ticket.findAll();
  const { id } = req.params;
  const dataBefore = await Ticket.findOne({
    where: { id: id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBefore));

  if (!parsedDataProfile) {
    return res.status(400).json({
      success: false,
      message: "Ticket Doesn't Existing",
    });
  }

  await Ticket.destroy({
    where: { id },
  });

  return res.status(200).json({
    success: true,
    message: "Delete Ticket Successfully",
  });
};

export const updateTicket = async (req, res) => {
  const { id } = req.params;
  const dataBeforeDelete = await Ticket.findOne({
    where: { id: id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBeforeDelete));

  if (!parsedDataProfile) {
    return res.status(400).json({
      success: false,
      message: "Ticket Not Found",
    });
  }

  const { flight_id, class_id, price, country, passanger_ammount } = req.body;

  try {
    await Ticket.update(
      {
        flight_id,
        class_id,
        price,
        country,
        passanger_ammount,
      },
      {
        where: { id: id },
      }
    );
    return res.status(200).json({
      success: true,
      message: "Ticket Success Updated",
    });
  } catch (error) {
    console.log(error);
  }
};

export const HandlerBooked = async (req, res) => {
  try {
    let { id } = req.params;
    let ticket = await Ticket.findAll({
      where: {
        id: id,
      },
    });
    let booking = Booking.create({
      ticket_id: ticket[0].id,
      isBooking: true,
    });

    await UserBooking.create({
      booking_id: ticket.id,
    });

    res.json({
      success: true,
      message: "Booking added",
    });
  } catch (error) {}
};

export const getUserBooking = async (req, res) => {
  try {
    const userbooking = await UserBooking.findAll({});
    res.json(userbooking);
  } catch (error) {
    console.log(error);
  }
};
