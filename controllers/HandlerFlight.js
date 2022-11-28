import db from "../models/index.js";

const Flight = db.flight;
const Airport = db.airport;
const FlightType = db.flighttype;
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
      ],
    });
    res.json(flight);
  } catch (error) {
    console.log(error);
  }
};

export const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findOne({
      where: { id: req.params.id },
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
      ],
    });
    res.status(200).json(flight);
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
    planeName,
  } = req.body;
  try {
    await Flight.create({
      departureAirport,
      arrivalAirport,
      departureDate,
      arrivalDate,
      departureTime,
      arrivalTime,
      flightType,
      planeName,
    });
    res.json({ msg: "Added Flight Successfully" });
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
      success: false,
      message: "Flight doesn't exist or has been deleted!",
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
      success: true,
      message: "Flight Success Updated",
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
      success: false,
      message: "Flight not found or nothing!",
    });
  }

  await Flight.destroy({
    where: { id },
  });

  return res.status(200).json({
    success: true,
    message: "Delete Data Successfully",
  });
};
