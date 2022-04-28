const { default: axios } = require('axios');
const logger = require("../../lib/logger");
const Notifications = require('../../models/notifications');


const sendNotifToMerchant = async (data, notifUrl) => {
  try {
    logger.info(`sending notification to URL #${notifURL} with payload: ${JSON.stringify(data)}`)
    await axios.post(notifUrl, data, { timeout: 10000 });
    await Notifications.update({
      notified_at: moment().utc().toDate()
    }, {
      where: {
        id: data.id,
      }
    })
    return true
  } catch (error) {
    logger.error(`send notification failed for payment id #${data.partner_trx_id} to merchant id #${data.merchant_end_customer_id} : ${error.message}`)
  }
}

module.exports = sendNotifToMerchant;