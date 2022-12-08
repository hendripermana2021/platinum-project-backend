import db from "../models/index.js";
import { Op } from "sequelize";

const Flight = db.flight;
const Airport = db.airport;
const FlightType = db.flighttype;
const Ticket = db.ticket;
const Plane = db.plane;
export const getFlight = async (req, res) => {
  try {
    const flight = await Flight.findAll({
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
          model: FlightType,
          as: "flighttype",
        },
        {
          model: Plane,
          as: "planename",
        },
      ],
    });
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: flight,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFlightBy = async (req, res) => {
  try {
    const { search } = req.params;
    let flight = await Flight.findAll({
      // where: {
      //   [Op.or]: [
      //     { id: { [Op.like]: `%` + search + `%` } },
      //     { departureDate: { [Op.like]: `%` + search + `%` } },
      //     { arrivalDate: { [Op.like]: `%` + search + `%` } },
      //     { departureTime: { [Op.like]: `%` + search + `%` } },
      //     { arrivalDate: { [Op.like]: `%` + search + `%` } },
      //   ],
      // },
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
          model: FlightType,
          as: "flighttype",
        },
        {
          model: Plane,
          as: "planename",
          where: {
            [Op.or]: [{ namePlane: { [Op.like]: `%` + search + `%` } }],
          },
        },
      ],
    });

    if (flight == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Flight Doesn't Existing",
      });
    }

    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: flight,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFlightById = async (req, res) => {
  const { id } = req.params;
  try {
    const flight = await Flight.findAll({
      where: {
        id: id,
      },
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
          model: FlightType,
          as: "flighttype",
        },
        {
          model: Plane,
          as: "planename",
        },
      ],
    });

    res.status(200).json({
      code: 200,
      status: true,
      msg: "Flight Found",
      data: flight,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createFlight = async (req, res) => {
  const {
    departureAirport,
    arrivalAirport,
    departureDate,
    arrivalDate,
    departureTime,
    arrivalTime,
    flightType,
    planeId,
  } = req.body;
  try {
    const flight = await Flight.create({
      departureAirport,
      arrivalAirport,
      departureDate,
      arrivalDate,
      departureTime,
      arrivalTime,
      flightType,
      planeId,
    });

    const ticket = await Ticket.create({
      flight_id: flight.id,
      class_id,
      price,
      country,
      isroundtrip,
    });

    res.status(200).json({
      code: 200,
      status: true,
      msg: "Added Flight Successfully",
      data: flight,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateFlight = async (req, res) => {
  const { id } = req.params;
  const dataBeforeDelete = await Flight.findOne({
    where: { id: id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBeforeDelete));

  if (!parsedDataProfile) {
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Flight doesn't exist or has been deleted!",
    });
  }

  const {
    departureAirport,
    arrivalAirport,
    departureDate,
    arrivalDate,
    departureTime,
    arrivalTime,
    flightType,
    planeName,
  } = req.body;
  try {
    await Flight.update(
      {
        departureAirport,
        arrivalAirport,
        departureDate,
        arrivalDate,
        departureTime,
        arrivalTime,
        flightType,
        planeName,
      },
      {
        where: { id: id },
      }
    );
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Flight Success Updated",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFlight = async (req, res) => {
  const flight = await Flight.findAll();
  const { id } = req.params;
  const dataBefore = await Flight.findOne({
    where: { id: id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBefore));

  if (!parsedDataProfile) {
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Flight not found or nothing!",
    });
  }

  await Flight.destroy({
    where: { id },
  });

  return res.status(200).json({
    code: 200,
    status: true,
    msg: "Delete Flight Successfully",
  });
};
