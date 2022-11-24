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

export const createWishlist = async (req, res) => {
  const {
    id_ticket,
    id_users,
    isWishlist
  } = req.body;
  try {
    await Wishlist.create({
      id_ticket,
      id_users: req.user.userId,
      isWishlist: true
    });
    res.json({ msg: "Added Wishlist Successfully" });
  } catch (error) {
    console.log(error);
  }
}

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