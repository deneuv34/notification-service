const Joi = require('joi')

const generateApiKeySchema = Joi.object({
  merchant_id: Joi.string().required(),
})

module.exports = generateApiKeySchema;
