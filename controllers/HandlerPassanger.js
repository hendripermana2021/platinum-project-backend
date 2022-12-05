import db from "../models/index.js";

const Passanger = db.passanger;

export const getPassanger = async (req, res) => {
  try {
    const passanger = await Passanger.findAll();
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: passanger,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPassangerById = async (req, res) => {
  try {
    const passanger = await Passanger.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: passanger,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createPassanger = async (req, res) => {
  try {
    for (let i = 0; i < req.body.length; i++) {
      await Passanger.create({
        name: req.body[i].name,
        email: req.body[i].email,
        age: req.body[i].age,
        identityType: req.body[i].identityType,
        identityNumber: req.body[i].identityNumber,
        booking_id: req.body[i].booking_id,
      });
    }

    res.status(200).json({
      code: 200,
      status: true,
      msg: "Added Passanger Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePassanger = async (req, res) => {
  const { id } = req.params;
  const dataBeforeDelete = await Passanger.findOne({
    where: { id: id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBeforeDelete));

  if (!parsedDataProfile) {
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Users doesn't exist or has been deleted!",
    });
  }

  const { name, email, age, identityType, identityNumber, booking_id } =
    req.body;
  try {
    await Passanger.update(
      {
        name,
        email,
        age,
        identityType,
        identityNumber,
        booking_id,
      },
      {
        where: { id: id },
      }
    );
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Passanger Success Updated",
    });
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
      code: 400,
      status: false,
      msg: "Passanger not found or nothing!",
    });
  }
  await Passanger.destroy({
    where: { id },
  });

  return res.status(200).json({
    status: true,
    msg: "Delete Data Successfully",
  });
};
