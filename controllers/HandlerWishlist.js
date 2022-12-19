import db from "../models/index.js";

const Users = db.users;
const Ticket = db.ticket;
const Wishlist = db.wishlist;
const Flight = db.flight;
const Airport = db.airport;

export const getWishlist = async (req, res) => {
  const reqIdUser = req.user.userId;
  try {
    const wishlist = await Wishlist.findAll({
      where: {
        user_id: reqIdUser,
      },

      include: [
        {
          model: Ticket,
          as: "ticketDeparture",
          include: { all: true },
        },
        {
          model: Ticket,
          as: "ticketReturn",
          include: { all: true },
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

    return res.status(200).json({
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
      where: { id: req.params.id, user_id: req.user.userId },
      include: [
        {
          model: Ticket,
          as: "ticketDeparture",
          include: { all: true },
        },
        {
          model: Ticket,
          as: "ticketReturn",
          include: { all: true },
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
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Wishlist you searched Found",
      data: wishlist,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createWishlist = async (req, res) => {
  const { ticket_id_departure, ticket_id_return } = req.body;
  try {
    let wishlist = Wishlist.create({
      user_id: req.user.userId,
      ticket_id_departure,
      ticket_id_return,
      isWishlist: true,
    });
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Wishlist added",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteWishlist = async (req, res) => {
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
