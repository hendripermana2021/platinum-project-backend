import db from "../models/index.js";
const Notification = db.notification;

export const getAllNotifyCondition = async (req, res) => {
  const { id } = req.params;
  const reqUserId = req.user.userId;
  try {
    //Check condition if id null, will display notif isread false
    if (!id) {
      const notify = await Notification.findAll({
        where: { user_id: reqUserId, isRead: false },
      });

      if (notify == "") {
        return res.status(400).json({
          code: 400,
          status: true,
          msg: "Notification isRead False is Nothing",
        });
      }

      return res.status(200).json({
        code: 200,
        status: true,

        msg: "Get Notification isRead false",
        data: notify,
      });
    }
    // END

    //will display notif isread true
    const notify = await Notification.findAll({
      where: { user_id: reqUserId, isRead: id },
    });

    if (notify == "") {
      return res.status(400).json({
        code: 400,
        status: true,
        msg: "Notification isRead True is Nothing",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Get Notification isRead True",
      data: notify,
    });
  } catch (error) {}
};

export const readNotify = async (req, res) => {
  const reqUserId = req.user.userId;
  try {
    await Notification.update(
      {
        isRead: true,
      },
      {
        where: { user_id: reqUserId },
      }
    );

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Notification All Read",
    });
  } catch (error) {}
};

export const getNotifyById = async (req, res) => {
  const reqUserId = req.user.userId;
  try {
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Notification All Read",
    });
  } catch (error) {}
};

export const deleteNotificationById = async (req, res) => {
  const { id } = req.params;
  const reqUserId = req.user.userId;
  try {
    const notif = await Notification.findOne({
      where: { id: id, user_id: reqUserId },
    });
    const parsedDataProfile = JSON.parse(JSON.stringify(notif));

    if (!parsedDataProfile) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Notif Doesn't Existing",
      });
    }

    await Notification.destroy({
      where: { id, user_id: reqUserId },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Delete Notification Successfully",
    });
  } catch (error) {}
};
