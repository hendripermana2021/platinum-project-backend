import db from "../models/index.js";
const Wallet = db.wallet;

export const getSaldoWallet = async (req, res) => {
  const getIdUsers = req.user.userId;
  try {
    const wallet = await Wallet.findOne({
      where: {
        user_id: getIdUsers,
      },
    });

    if (wallet == 0) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "wallet not found, please register wallet first",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "wallet found",
      data: wallet,
    });
  } catch (error) {}
};

export const createWallet = async (req, res) => {
  const { user_id, balance } = req.body;
  try {
    const wallet = await Wallet.create({
      user_id,
      balance,
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: `wallet has been created to user ${user_id}`,
      data: wallet,
    });
  } catch (error) {}
};

export const updateWallet = async (req, res) => {
  const { id } = req.params;
  const wallet = await Wallet.findOne({
    where: { id: id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(wallet));

  if (!parsedDataProfile) {
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Users doesn't exist or has been deleted!",
    });
  }

  const { user_id, balance } = req.body;
  try {
    await Wallet.update(
      {
        user_id,
        balance,
      },
      {
        where: { id: id },
      }
    );
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Wallet Success Updated",
    });
  } catch (error) {
    console.log(error);
  }
};
