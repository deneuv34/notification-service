const { default: axios } = require('axios');
const moment = require('moment');
const logger = require("../../lib/logger");
const AuthKeys = require('../../models/auth_keys');
const Notifications = require('../../models/notifications');
const Partners = require('../../models/partners');


const sendNotifToMerchant = async (data, notifUrl) => {
  try {
    logger.info(`sending notification to URL #${notifUrl} with payload: ${JSON.stringify(data)}`)
    
    const merchant = await Partners.findOne({ where: { business_id: data.business_id } });
    const authKey = await AuthKeys.findOne({ where: { merchant_id: merchant.merchant_id }});
    let headers = {};
  
    if (authKey) {
      headers = { apiKey: authKey.key } 
    }
    await axios.post(notifUrl, data, {
      timeout: 10000, headers
    });
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