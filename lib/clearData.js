const AuthKeys = require("../models/auth_keys")
const MerchantNotifURLs = require("../models/merchantNotifURLs")
const Notifications = require("../models/notifications")
const Partners = require("../models/partners")

const clearData = async () => {
  await Promise.all([
    Notifications.truncate(),
    MerchantNotifURLs.truncate(),
    AuthKeys.truncate(),
    // Partners.truncate()
  ])
}

module.exports = clearData