import db from "../models/index.js";
import { Op } from "sequelize";

const Airport = db.airport;
export const getAirport = async (req, res) => {
  try {
    const airport = await Airport.findAll({});
    res.status(200).json({
      code: 200,
      status: true,
      msg: "Airports searched Found",
      data: airport,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createAirport = async (req, res) => {
  const { name, code, city, country, terminal, status } = req.body;
  const airportName = await Airport.findAll({
    where: {
      name: name,
    },
  });
  if (airportName != "")
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "airports is already exists",
    });

  const airportCode = await Airport.findAll({
    where: {
      code: code,
    },
  });
  if (airportCode != "")
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "code is already exists",
    });
  try {
    const airport = await Airport.create({
      name,
      code,
      city,
      country,
      terminal,
      status: true,
    });

    res.status(200).json({
      code: 200,
      status: true,
      msg: "Added Airport Successfully",
      data: airport,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAirport = async (req, res) => {
  const airport = await Airport.findAll();
  const { id } = req.params;
  const dataBefore = await Airport.findOne({
    where: { id: id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBefore));

  if (!parsedDataProfile) {
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Airports Doesn't Existing",
    });
  }

  await Airport.destroy({
    where: { id },
  });

  return res.status(200).json({
    code: 200,
    status: true,
    msg: "Delete Airport Successfully",
  });
};

export const getAirportBy = async (req, res) => {
  try {
    const { search } = await req.params;
    let airport = await Airport.findAll({
      where: {
        [Op.or]: [{ name: { [Op.like]: `%` + search + `%` } }],
      },
    });
    if (airport == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Airports Doesn't Existing",
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: airport,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAirportById = async (req, res) => {
  try {
    const airport = await Airport.findAll({
      where: { id: req.params.id },
    });

    if (airport == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Airports Doesn't Existing",
        data: airport,
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: airport,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateAirport = async (req, res) => {
  const { id } = req.params;
  const dataBeforeDelete = await Airport.findOne({
    where: { id: id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBeforeDelete));

  if (!parsedDataProfile) {
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Airports doesn't exist or has been deleted!",
    });
  }

  const { name, code, city, country, terminal, status } = req.body;
  try {
    await Airport.update(
      {
        name,
        code,
        city,
        country,
        terminal,
        status,
      },
      {
        where: { id: id },
      }
    );
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Airport Success Updated",
      data: Airport,
    });
  } catch (error) {
    console.log(error);
  }
};
