const getNotificationByBussinessId = require("../services/notifications/getNotificationByPartner");

const getNotifications = async (req, res, next) => {
  try {
    const notifications = await getNotificationByBussinessId(req.params.businessId);

    res.status(200).json(notifications)
  } catch (error) {
    next(error)
  }
}

module.exports = getNotifications;
