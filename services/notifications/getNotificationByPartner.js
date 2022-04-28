const Notifications = require("../../models/notifications")

const getNotificationByBussinessId = async (bussinessId) => {
  return Notifications.findAll({
    where: {
      business_id: bussinessId,
    },
    limit: 100,
  })
}

module.exports = getNotificationByBussinessId
