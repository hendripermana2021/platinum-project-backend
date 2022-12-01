import db from "../models/index.js";

const Ticket = db.ticket;
const Type = db.classtype;
const Flight = db.flight;
const Airport = db.airport;
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
    res.json(ticket);
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
    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
  }
};

export const createTicket = async (req, res) => {
  const { id, flight_id, class_id, price, country, passanger_ammount } =
    req.body;
  try {
    await Ticket.create({
      id,
      flight_id,
      class_id,
      price,
      country,
      passanger_ammount,
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
