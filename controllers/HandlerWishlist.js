import db from "../models/index.js";

const Users = db.users;
const Ticket = db.ticket;
const Wishlist = db.wishlist;
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findAll({
      include: [
        {
          model: Users,
          as: "users",
        },
        {
          model: Ticket,
          as: "ticket",
        },
      ],
    });
    res.json(wishlist);
  } catch (error) {
    console.log(error);
  }
};

export const getWishlistbyid = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Users,
          as: "users",
        },
        {
          model: Ticket,
          as: "ticket",
        },
      ],
    });
    res.status(200).json(wishlist);
  } catch (error) {
    console.log(error);
  }
};

export const createWishlist = async (req, res) => {
  const { user_id, ticket_id } = req.body;
  try {
    await Wishlist.create({
      user_id,
      ticket_id,
      isWishlist: true,
    });
    res.json({ msg: "Added Wishlist Successfully" });
  } catch (error) {
    console.log(error);
  }
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
