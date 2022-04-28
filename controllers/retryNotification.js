const moment = require("moment");
const { ERROR_URL_NOT_FOUND } = require("../lib/const");
const logger = require("../lib/logger");
const MerchantNotifURLs = require("../models/merchantNotifURLs");
const Notifications = require("../models/notifications");
const Partners = require("../models/partners");
const sendNotifToMerchant = require("../services/notifications/sendNotifToMerchant");

const retryNotification = async (req, res, next) => {
  const { notificationId } = req.params;

  try {
    const notification = await Notifications.findOne({ where: { id: notificationId } })
    if (!notification) return res.status(400).json({ error: "Invalid notification id" });

    const partner = await Partners.findOne({ where: { business_id: notification.business_id } })
    const merchant = await MerchantNotifURLs.findOne({
      where:  { merchant_id: partner.merchant_id }
    });

    if (!merchant) return res.status(400).json({ error: ERROR_URL_NOT_FOUND });

    if (notification) {
      Notifications.update({ retry_at: moment().utc().toDate() }, { where: { id: notificationId } })
      sendNotifToMerchant(notification, merchant.merchant_url)
    }

    res.status(200).json({
      message: 'Notification has been sent',
    })
  } catch (err) {
    logger.error(`couldn't send the notification for notification id #${notificationId}: ${err.message}`)
    if (err === ERROR_URL_NOT_FOUND) res.status(404).json({ error: ERROR_URL_NOT_FOUND });
  }
}

module.exports = retryNotification;
