import db from "../models/index.js";

const Payment = db.payment;
const UserBooking = db.userbooking;
const History = db.history;
const Wallet = db.wallet;
const sequelize = db.sequelize;
import { QueryTypes } from "sequelize";

export const getPaymentBeforePay = async (req, res) => {
  try {
    const getDataByUserId = req.user.userId;
    const sql = `SELECT * FROM UserBookings ub JOIN Payments p on ub.id = p.userBooking_id JOIN Bookings b on ub.booking_id = b.id JOIN Tickets t on b.ticket_id_departure = t.id JOIN Flights f on t.flight_id = f.id WHERE p.isPayed = false AND user_id = ${getDataByUserId}`;
    const replacements = {};
    const payments = await sequelize.query(sql, {
      replacements,
      type: QueryTypes.SELECT,
      raw: true,
    });

    let paymentData = JSON.parse(JSON.stringify(payments));

    if (payments == "") {
      return res.status(400).json({
        code: 400,
        status: true,
        msg: "You Dont Have Payments, Please Booking now",
      });
    }

    return res.status(200).json({
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

export const isPaymentTicket = async (req, res) => {
  const { id } = req.params;
  const reqIdUsers = req.user.userId;

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
            user_id: reqIdUsers,
          },
        },
      ],
    });

    const paymentMutual = JSON.parse(JSON.stringify(payment));

    const wallet = await Wallet.findOne({
      where: {
        user_id: reqIdUsers,
      },
    });

    const walletUsers = JSON.parse(JSON.stringify(wallet));

    if (paymentMutual == null) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "You Dont have Payment Ticket",
      });
    }

    if (paymentMutual.totalPrice >= walletUsers.balance) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Wallet is not Enough please Top Up",
      });
    }

    let paymentResult = walletUsers.balance - paymentMutual.totalPrice;

    await Wallet.update(
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

    await Payment.destroy({
      where: { id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Payment Success",
      data: { paymentMutual, walletUsers },
    });
  } catch (error) {
    console.log(error);
  }
};
