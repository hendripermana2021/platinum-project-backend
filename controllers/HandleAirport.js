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
