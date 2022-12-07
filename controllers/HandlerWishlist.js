import db from "../models/index.js";

const Users = db.users;
const Ticket = db.ticket;
const Wishlist = db.wishlist;
const Flight = db.flight;
const Airport = db.airport;

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findAll({
      where: {
        user_id: req.user.userId,
      },
      include: [
        {
          model: Users,
          as: "users",
        },
        {
          model: Ticket,
          as: "ticketDeparture",
          include: [
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
        },
        {
          model: Ticket,
          as: "ticketReturn",
          include: [
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
        },
      ],
    });
    res.status(200).json({
      code: 200,
      status: true,
      msg: "Ticket Added",
      data: wishlist,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getWishlistbyid = async (req, res) => {
  try {
    const wishlist = await Wishlist.findAll({
      where: { id: req.params.id },
      include: [
        {
          model: Users,
          as: "users",
        },
        {
          model: Ticket,
          as: "ticketDeparture",
          include: [
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
        },
        {
          model: Ticket,
          as: "ticketReturn",
          include: [
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
        },
      ],
    });

    if (wishlist == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Wishlist Doesn't Existing",
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      msg: "Wishlist you searched Found",
      data: wishlist,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getWishlistby = async (req, res) => {
  try {
    const { search } = req.params;
    const wishlist = await Wishlist.findAll({
      include: [
        {
          model: Users,
          as: "users",
        },
        {
          model: Ticket,
          as: "ticketDeparture",
          include: [
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
        },
        {
          model: Ticket,
          as: "ticketReturn",
          include: [
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
        },
      ],
    });

    if (wishlist == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Wishlist Doesn't Existing",
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      msg: "ticket you searched Found",
      data: wishlist,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createWishlist = async (req, res) => {
  const { ticket_id_departure, ticket_id_return } = req.body;
  try {
    let { id } = req.params;
    let ticket = await Ticket.findAll({
      where: {
        id: id,
      },
    });
    let wishlist = Wishlist.create({
      user_id: req.user.userId,
      ticket_id_departure,
      ticket_id_return,
      isWishlist: true,
    });
    res.status(200).json({
      status: true,
      msg: "Wishlist added",
    });
  } catch (error) {}
};

export const deleteWishlist = async (req, res) => {
  const wishlist = await Wishlist.findAll();
  const { id } = req.params;
  const dataBefore = await Wishlist.findOne({
    where: { id: id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBefore));

  if (!parsedDataProfile) {
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Wishlist Doesn't Existing",
    });
  }

  await Wishlist.destroy({
    where: { id },
  });

  return res.status(200).json({
    code: 200,
    status: true,
    msg: "Delete Wishlist Successfully",
  });
};
