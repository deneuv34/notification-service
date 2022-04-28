const logger = require("../lib/logger");
const createNotification = require("../services/notifications/createNotification");
const { findPartnerTransaction } = require("../services/partners");


const postNotification = async (req, res) => {

  const { body } = req;
  try {
    const transaction = await findPartnerTransaction({
      business_id: body.virtual_account_number,
      transaction_id: body.transaction_id,
    })

    if (!transaction) res.status(400).json({
      error: "payment transaction not found"
    })

    const payload = {
      business_id: transaction.business_id,
      transaction_timestamp: body.transaction_timestamp,
      merchant_end_customer_id: transaction.merchant_end_customer_id,
      partner_trx_id: body.partner_trx_id,
      amount: body.amount,
    }
  
    const data = await createNotification(payload);

    return res.status(200).json({ 
      message: 'Notification has been sent and created successfully',
      data
    })
  } catch (error) {
    logger.error(`couldn't send the notification for payment id #${body.partner_trx_id}: ${error.message}`)
    res.status(400).json({ error: error.message })
  }
}

module.exports = postNotification;

