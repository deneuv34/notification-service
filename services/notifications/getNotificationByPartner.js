const Notifications = require("../../models/notifications")

const getNotificationByBussinessId = async (bussinessId) => {
  return Notifications.findAll({
    where: {
      bussiness_id: bussinessId,
    },
    limit: 100,
    order: {
      created_at: 'DESC',
    }
  })
}

module.exports = getNotificationByBussinessId
