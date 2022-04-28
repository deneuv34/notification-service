const AuthKeys = require("../models/auth_keys")
const MerchantNotifURLs = require("../models/merchantNotifURLs")
const Partners = require("../models/partners")

const initTestData = async () => {
  await Promise.all([
    Partners.create({ business_id: "1234", partner_trx_id: "demo-123456789", merchant_end_customer_id: 'test-1234', merchant_id: 'business123' }),
    AuthKeys.create({ merchant_id: 'business123', key: 'test123' }),
    MerchantNotifURLs.create({ merchant_id: 'business123', merchant_url: 'http://test.com/notifications' }),
  ])
    
}

module.exports = initTestData
