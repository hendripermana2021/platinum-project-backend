import db from "../models/index.js";

const Passanger = db.passanger;

export const getPassanger = async (req, res) => {
  try {
    const passanger = await Passanger.findAll();
    res.json(passanger);
  } catch (error) {
    console.log(error);
  }
};

export const getPassangerById = async (req, res) => {
  try {
    const passanger = await Passanger.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json(passanger);
  } catch (error) {
    console.log(error);
  }
};

export const createPassanger = async (req, res) => {
  const { name, email, age, indentityType, identityNumber, booking_id } =
    req.body;
  try {
    await Passanger.create({
      name,
      email,
      age,
      indentityType,
      identityNumber,
      booking_id,
    });
    res.json({ msg: "Added Passanger Successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const deletePassanger = async (req, res) => {
  const passanger = await Passanger.findAll();
  const { id } = req.params;
  const dataBefore = await Passanger.findOne({
    where: { id: id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBefore));

  if (!parsedDataProfile) {
    return res.status(400).json({
      success: false,
      message: "Passanger not found or nothing!",
    });
  }
  await Passanger.destroy({
    where: { id },
  });

  return res.status(200).json({
    success: true,
    message: "Delete Data Successfully",
  });
};
