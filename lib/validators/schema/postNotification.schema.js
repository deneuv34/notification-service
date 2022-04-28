const Joi = require('joi')

const postNotificationSchema = Joi.object({
  virtual_account_number: Joi.string().required(),
  transaction_timestamp: Joi.date().iso().required(),
  partner_trx_id: Joi.string().required(),
  amount: Joi.number().required()
})

module.exports = postNotificationSchema;
