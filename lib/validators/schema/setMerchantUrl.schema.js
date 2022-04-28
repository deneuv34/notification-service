const Joi = require('joi')

const setMerchanUrlSchema = Joi.object({
  merchant_id: Joi.string().required(),
  merchant_url: Joi.string().required(),
})

module.exports = setMerchanUrlSchema;
