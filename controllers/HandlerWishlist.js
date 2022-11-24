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
