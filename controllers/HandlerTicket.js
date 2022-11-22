import db from "../models/index.js";

const Ticket = db.Ticket;
export const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findAll({
      attributes: [
        "id",
        "id_airport",
        "arrival_id",
        "departure_date",
        "departure_time",
        "arrival_time",
        "passenger",
        "departure_terminal",
        "arrival_terminal",
        "price",
        "type_class",
        "plane_name",
        "oneway",
      ],
    });
    res.json(ticket);
  } catch (error) {
    console.log(error);
  }
};

export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
  }
};

export const createTicket = async (req, res) => {
  const {
    id_airport,
    arrival_id,
    departure_date,
    departure_time,
    arrival_time,
    passenger,
    departure_terminal,
    arrival_terminal,
    price,
    type_class,
    plane_name,
    oneway,
  } = req.body;
  try {
    await Ticket.create({
      id_airport,
      arrival_id,
      departure_date,
      departure_time,
      arrival_time,
      passenger,
      departure_terminal,
      arrival_terminal,
      price,
      type_class,
      plane_name,
      oneway,
    });
    res.json({ msg: "Added Ticket Successfully" });
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

  const {
    id_airport,
    arrival_id,
    departure_date,
    departure_time,
    arrival_time,
    passenger,
    departure_terminal,
    arrival_terminal,
    price,
    type_class,
    plane_name,
    oneway,
  } = req.body;

  try {
    await Ticket.update(
      {
        id_airport,
        arrival_id,
        departure_date,
        departure_time,
        arrival_time,
        passenger,
        departure_terminal,
        arrival_terminal,
        price,
        type_class,
        plane_name,
        oneway,
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
