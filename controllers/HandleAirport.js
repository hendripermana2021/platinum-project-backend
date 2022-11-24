import airport from "../models/airport.js";
import db from "../models/index.js";

const Airport = db.Airport;
export const getAirport = async (req, res) => {
  try {
    const airport = await Airport.findAll({
      attributes: [
        "id",
        "name_airport",
        "code_airport",
        "address",
        "city_airport",
        "country_airport",
        "terminal",
        "status",
      ],
    });
    res.json(airport);
  } catch (error) {
    console.log(error);
  }
};

export const createAirport = async (req, res) => {
  const {
    name_airport,
    code_airport,
    address,
    city_airport,
    country_airport,
    terminal,
    status,
  } = req.body;
  try {
    await Airport.create({
      name_airport,
      code_airport,
      address,
      city_airport,
      country_airport,
      terminal,
      status,
    });
    res.json({ msg: "Added Airport Successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAirport = async (req, res) => {
  const Airport = await airport.findAll();
  const { id } = req.params;
  const dataBefore = await Airport.findOne({
    where: { id: id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBefore));

  if (!parsedDataProfile) {
    return res.status(400).json({
      success: false,
      message: "Airports Doesn't Existing",
    });
  }

  await Airport.destroy({
    where: { id },
  });

  return res.status(200).json({
    success: true,
    message: "Delete Airport Successfully",
  });
};

export const getAirportById = async (req, res) => {
  try {
    const airport = await Airport.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json(airport);
  } catch (error) {
    console.log(error);
  }
};

export const updateUpdate = async (req, res) => {
  const { id } = req.params;
  const dataBeforeDelete = await Users.findOne({
    where: { id: id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBeforeDelete));

  if (!parsedDataProfile) {
    return res.status(400).json({
      success: false,
      message: "Airports doesn't exist or has been deleted!",
    });
  }

  const {
    name_airport,
    code_airport,
    address,
    city_airport,
    country_airport,
    terminal,
    status,
  } = req.body;
  try {
    await Airport.update(
      {
        name_airport,
        code_airport,
        address,
        city_airport,
        country_airport,
        terminal,
        status,
      },
      {
        where: { id: id },
      }
    );
    return res.status(200).json({
      success: true,
      message: "Airport Success Updated",
    });
  } catch (error) {
    console.log(error);
  }
};
