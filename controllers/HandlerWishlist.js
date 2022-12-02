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
          as: "ticket",
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
      success: true,
      message: "Ticket Added",
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
          as: "ticket",
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
        success: false,
        message: "Wishlist Doesn't Existing",
      });
    }
    res.status(200).json({
      success: true,
      message: "ticket you searched Found",
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
          as: "ticket",
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
        success: false,
        message: "Wishlist Doesn't Existing",
      });
    }
    res.status(200).json({
      success: true,
      message: "ticket you searched Found",
      data: wishlist,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createWishlist = async (req, res) => {
  try {
    let { id } = req.params;
    let ticket = await Ticket.findAll({
      where: {
        id: id,
      },
    });
    let wishlist = Wishlist.create({
      user_id: req.user.userId,
      ticket_id: ticket[0].id,
      isWishlist: true,
    });
    res.json({
      success: true,
      message: "Wishlist added",
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
      success: false,
      message: "Wishlist Doesn't Existing",
    });
  }

  await Wishlist.destroy({
    where: { id },
  });

  return res.status(200).json({
    success: true,
    message: "Delete Wishlist Successfully",
  });
};
