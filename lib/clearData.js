const AuthKeys = require("../models/auth_keys")
const MerchantNotifURLs = require("../models/merchantNotifURLs")
const Notifications = require("../models/notifications")
const Partners = require("../models/partners")

const clearData = async () => {
  await Promise.all([
    Notifications.destroy({ truncate: { cascade: false }, force: true }),
    MerchantNotifURLs.destroy({ truncate: { cascade: false }, force: true }),
    AuthKeys.destroy({ truncate: { cascade: false }, force: true }),
    Partners.destroy({ truncate: { cascade: false }, force: true })
  ])
}

module.exports = clearData