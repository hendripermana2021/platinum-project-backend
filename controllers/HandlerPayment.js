import db from "../models/index.js";

const Payment = db.payment;
const UserBooking = db.userbooking;
const Users = db.users;
const History = db.history;

export const getPayment = async (req, res) => {
  try {
    const payment = await Payment.findAll({
      where: {
        isPayed: false,
      },
      include: [
        {
          model: UserBooking,
          as: "usersPayment",
          where: {
            user_id: req.user.userId,
          },
          include: [
            {
              model: Users,
              as: "users",
            },
          ],
        },
      ],
    });
    res.status(200).json({
      code: 200,
      status: true,
      msg: "This Payment you have ",
      data: payment,
    });
  } catch (error) {
    console.log(error);
  }
};

export const BuyingTicket = async (req, res) => {
  const { id } = req.params;
  const dataBeforeDelete = await Payment.findOne({
    where: { id: id },
  });

  const parsedDataProfile = JSON.parse(JSON.stringify(dataBeforeDelete));

  if (!parsedDataProfile) {
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Payment doesn't exist or has been deleted!",
    });
  }
  try {
    await Payment.update(
      {
        isPayed: true,
      },
      {
        where: { id: id },
      }
    );

    const payment = await Payment.findAll({
      where: {
        id: id,
      },
    });

    const history = await History.create({
      userBooking_id: payment[0].id,
      payment_id: id,
      isHistory: true,
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Ticket already Booked",
      data: { payment, history },
    });
  } catch (error) {
    console.log(error);
  }
};
