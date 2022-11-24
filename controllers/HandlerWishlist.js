import db from "../models/index.js";

const Users = db.users;
const Ticket = db.ticket;
const Wishlist = db.wishlist;
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findAll({
      attributes: ["id", "id_ticket", "id_users", "isWishlist"],
      include: [
        {
          model: Users,
          as: "users",
          attributes: ["id", "firstname", "lastname"],
        },
        {
          model: Ticket,
          as: "tickets",
          attributes: ["id", "arrival_id", "departure_date"],
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
      attributes: ["id", "id_ticket", "id_users", "isWishlist"],
      include: [
        {
          model: Users,
          as: "users",
          attributes: ["id", "firstname", "lastname"],
        },
        {
          model: Ticket,
          as: "tickets",
          attributes: ["id", "arrival_id", "departure_date"],
        },
      ],
    });
    res.status(200).json(wishlist);
  } catch (error) {
    console.log(error);
  }
};
