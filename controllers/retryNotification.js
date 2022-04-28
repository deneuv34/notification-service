const { ERROR_URL_NOT_FOUND } = require("../lib/const");
const logger = require("../lib/logger");
const MerchantNotifURLs = require("../models/merchantNotifURLs");
const Notifications = require("../models/notifications");
const sendNotifToMerchant = require("../services/notifications/sendNotifToMerchant");

const retryNotification = async (req, res, next) => {
  const { notificationId } = req.params;

  try {
    const notification = await Notifications.findOne({ where: { id: notificationId } })
    if (!notification) return res.status(400).json({ error: "Invalid notification id" });
    const merchantUrl = await MerchantNotifURLs.findOne({
      where:  { bussiness_id: notification.bussiness_id }
    });

    if (!merchantUrl) return res.status(400).json({ error: ERROR_URL_NOT_FOUND });


    if (notification) {
      sendNotifToMerchant(notification)
    }

    res.status(200).json({
      message: 'Notification has been sent',
    })
  } catch (err) {
    logger.error(`couldn't send the notification for notification id #${notificationId}: ${err.message}`)
    if (err === ERROR_URL_NOT_FOUND) return res.status(404).json({ error: ERROR_URL_NOT_FOUND });
    next(err);
  }
}

module.exports = retryNotification;
