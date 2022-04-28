const moment = require("moment")
const { ERROR_URL_NOT_FOUND } = require("../../lib/const")
const createHash = require("../../lib/createHash")
const logger = require("../../lib/logger")
const MerchantNotifURLs = require("../../models/merchantNotifURLs")
const Notifications = require("../../models/notifications")
const sendNotifToMerchant = require("./sendNotifToMerchant")

// return [data: Notifications, created: boolean]
const createNotification = async (data) => {
  try {
    const notifUrl = await MerchantNotifURLs.findOne({ where: { business_id: data.business_id }});
    if (!notifUrl) throw new Error(ERROR_URL_NOT_FOUND)
    const notifData = await Notifications.create({
      business_id: data.business_id,
      partner_trx_id: data.partner_trx_id,
      merchant_end_customer_id: data.merchant_end_customer_id,
      amount: data.amount,
      id: createHash(`${data.merchant_end_customer_id}_${data.partner_trx_id}`),
      transaction_timestamp: moment(data.transaction_timestamp, moment.ISO_8601).toDate(),
    })

    sendNotifToMerchant(notifData, notifUrl.merchant_url)

    return notifData;
  } catch (error) {logger.error(`Couldn't create the notification data for payment id #${data.partner_trx_id}, ${JSON.stringify(error)}`)
    if (error.name === 'SequelizeUniqueConstraintError') throw new Error(`Notification data is already exists`)

    throw new Error(error.message);
  }
}

module.exports = createNotification;
