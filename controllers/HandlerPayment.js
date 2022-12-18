import db from "../models/index.js";

const Payment = db.payment;
const UserBooking = db.userbooking;
const History = db.history;
const Wallet = db.wallet;
const sequelize = db.sequelize;
import { QueryTypes } from "sequelize";

export const getPayment = async (req, res) => {
  try {
    const getDataByUserId = req.user.userId;
    const sql = `SELECT * FROM userbookings ub JOIN payments p on ub.id = p.userBooking_id JOIN bookings b on ub.booking_id = b.id JOIN tickets t on b.ticket_id_departure = t.id JOIN flights f on t.flight_id = f.id WHERE p.isPayed = false AND user_id = ${getDataByUserId}`;
    const replacements = {};
    const payments = await sequelize.query(sql, {
      replacements,
      type: QueryTypes.SELECT,
      raw: true,
    });
    console.log(payments);

    let paymentData = JSON.parse(JSON.stringify(payments));

    res.status(200).json({
      code: 200,
      status: true,
      msg: "This Payment you have ",
      data: {
        paymentData,
      },
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

export const isPaymentBooking = async (req, res) => {
  const { id } = req.params;
  const wallet = req.body.wallet;

  try {
    const payment = await Payment.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: UserBooking,
          as: "usersPayment",
          where: {
            user_id: req.user.userId,
          },
        },
      ],
    });

    const paymentMutual = JSON.parse(JSON.stringify(payment));

    if (paymentMutual == 0) {
      res.status(400).json({
        code: 400,
        status: false,
        msg: "You Dont have Payment Ticket",
      });
    }

    if (paymentMutual.totalPrice >= wallet) {
      res.status(400).json({
        code: 400,
        status: false,
        msg: "Wallet is not Enough please Top Up",
      });
    }

    let paymentResult = wallet - paymentMutual.totalPrice;

    const walletView = await Wallet.update(
      {
        balance: paymentResult,
      },
      {
        where: { user_id: req.user.userId },
      }
    );

    const history = await History.create({
      userBooking_id: paymentMutual.userBooking_id,
      payment_id: paymentMutual.id,
      isHistory: true,
    });

    // await Payment.destroy({
    //   where: { id },
    // });\

    res.status(200).json({
      code: 200,
      status: true,
      msg: "Payment Success",
      data: { payment, history, walletView },
    });
  } catch (error) {
    console.log(error);
  }
};
