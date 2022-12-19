import db from "../models/index.js";

const History = db.history;
const UserBooking = db.userbooking;

export const getHistoryPayment = async (req, res) => {
  const reqUserId = req.user.userId;
  const { condition } = req.params;
  try {
    const history = await History.findAll({
      where: { isHistory: condition },
      include: [
        {
          model: UserBooking,
          as: "userBooking",
          where: { user_id: reqUserId },
          include: { all: true, include: { all: true } },
        },
      ],
    });

    const parsedHistory = JSON.parse(JSON.stringify(history));

    if (history == "") {
      return res.status(400).json({
        code: 400,
        status: true,
        msg: `you don't have history payment`,
      });
    }
    return res.status(200).json({
      code: 200,
      status: true,
      msg: `you don't have history payment`,
      data: history,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getHistoryById = async (req, res) => {
  try {
    const history = await History.findOne({
      where: { id: req.params.id },
    });
    return res.status(200).json({
      code: 200,
      status: true,
      msg: `This payment users with id ${id}`,
      data: history,
    });
  } catch (error) {
    console.log(error);
  }
};

export const DeleteHistoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const history = await History.findOne({
      where: { id: id },
    });
    const parsedDataProfile = JSON.parse(JSON.stringify(history));

    if (!parsedDataProfile) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "History Doesn't Existing",
      });
    }

    await History.destroy({
      where: { id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Delete History Successfully",
    });
  } catch (error) {}
};
