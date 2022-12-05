import db from "../models/index.js";
import { Op } from "sequelize";

const Ticket = db.ticket;
const Type = db.classtype;
const Flight = db.flight;
const Airport = db.airport;
const Booking = db.booking;
const UserBooking = db.userbooking;
const Plane = db.plane;
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
            {
              model: Plane,
              as: "flight_plane",
            },
          ],
        },
      ],
    });
    res.status(200).json({
      code: 200,
      status: true,
      msg: "ticket you searched Found",
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
            {
              model: Plane,
              as: "plane",
            },
          ],
        },
      ],
    });
    res.status(200).json({
      code: 200,
      status: true,
      msg: "Ticket You searched Found",
      data: ticket,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTicketQuery = async (req, res) => {
  try {
    let arrival = req.query.arrival;
    let departure = req.query.departure;
    let datedeparture = req.query.datedeparture;
    let datearrival = req.query.datearrival;
    let totalPassanger = req.query.totalPassanger;
    let ticket = await Ticket.findAll({
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
              where: {
                code: departure,
              },
            },
            {
              model: Airport,
              as: "ArrivalTerminal",
              where: {
                code: arrival,
              },
            },
          ],
        },
      ],
    });

    const result = [];
    const departureDate = new Date(datedeparture);
    for (let i = 0; i < ticket.length; i++) {
      if (
        ticket[i].flight !== null &&
        ticket[i].flight.departureDate >= departureDate
      )
        result.push(ticket[i]);
    }

    if (result == "") {
      res.status(400).json({
        code: 400,
        status: false,
        msg: "Ticket Not Found",
        data: result,
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      msg: "Ticket Found",
      data: result,
    });

    // if (isroundtrip == false) {
    //   const result = [];
    //   const departureDate = new Date(datedeparture);
    //   for (let i = 0; i < ticket.length; i++) {
    //     if (
    //       ticket[i].flight !== null &&
    //       ticket[i].flight.departureDate >= departureDate &&
    //       ticket[i].passanger_ammount == passanger_ammount
    //     )
    //       result.push(ticket[i]);
    //   }

    //   if (result == []) {
    //     res.status(400).json({
    //       code: 400,
    //       status: false,
    //       msg: "Ticket Not Found",
    //       data: result,
    //     });
    //   }
    //   res.status(200).json({
    //     code: 200,
    //     status: true,
    //     msg: "Ticket Found",
    //     data: result,
    //   });
    // }

    // if (isroundtrip == true) {
    //   const result = [];
    //   const departureDate = new Date(datedeparture);
    //   const arrivalDate = new Date(datearrival);
    //   for (let i = 0; i < ticket.length; i++) {
    //     if (
    //       ticket[i].flight !== null &&
    //       ticket[i].flight.departureDate >= departureDate &&
    //       ticket[i].flight.arrivalDate >= arrivalDate &&
    //       ticket[i].passanger_ammount == passanger_ammount
    //     )
    //       result.push(ticket[i]);
    //   }
    //   res.status(200).json({
    //     code: 200,
    //     status: true,
    //     msg: "Ticket Found",
    //     data: result,
    //   });

    //   if (result == "") {
    //     res.status(400).json({
    //       code: 400,
    //       status: false,
    //       msg: "Ticket Not Found",
    //       data: result,
    //     });
    //   }
    // }
  } catch (error) {
    console.log(error);
  }
};

export const createTicket = async (req, res) => {
  try {
    for (let i = 0; i < req.body.length; i++) {
      await Ticket.create({
        flight_id: req.body[i].flight_id,
        class_id: req.body[i].class_id,
        price: req.body[i].price,
        country: req.body[i].country,
        passanger_ammount: req.body[i].passanger_ammount,
        isroundtrip: req.body[i].isroundtrip,
      });

      // const ticket = await Ticket.findAll({
      //   where: {
      //     flight_id: req.body[i].flight_id,
      //     class_id: req.body[i].class_id,
      //     price: req.body[i].price,
      //     country: req.body[i].country,
      //     passanger_ammount: req.body[i].passanger_ammount,
      //   },
    }

    res.status(200).json({
      code: 200,
      status: true,
      msg: "Added Ticket Successfully",
      // data: ticket,
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
      code: 400,
      status: false,
      msg: "Ticket Doesn't Existing",
    });
  }

  await Ticket.destroy({
    where: { id },
  });

  return res.status(200).json({
    code: 200,
    status: true,
    msg: "Delete Ticket Successfully",
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
      code: 400,
      status: false,
      msg: "Ticket Not Found",
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
      code: 200,
      status: true,
      msg: "Ticket Success Updated",
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

    res.status(200).json({
      code: 200,
      status: true,
      msg: "Booking added",
    });
  } catch (error) {}
};

export const getUserBooking = async (req, res) => {
  try {
    const userbooking = await UserBooking.findAll({});
    res.status(200).json({
      code: 200,
      status: true,
      msg: "Get Users Booking Successful",
      data: userbooking,
    });
  } catch (error) {
    console.log(error);
  }
};
