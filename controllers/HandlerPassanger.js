import db from "../models/index.js";

const Passanger = db.passanger;

export const getPassanger = async (req, res) => {
  try {
    const passanger = await Passanger.findAll();
    res.json(passanger);
  } catch (error) {
    console.log(error);
  }
};

export const getPassangerById = async (req, res) => {
  try {
    const passanger = await Passanger.findOne({
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
        },
      ],
    });
    res.status(200).json(booking);
  } catch (error) {
    console.log(error);
  }
};
