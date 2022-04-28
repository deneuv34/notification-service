
const Notifications = require('../../../../models/notifications')
const getNotificationByPartner = require('../../../../services/notifications/getNotificationByPartner')

jest.mock('../../../../models/notifications', () => ({
  findAll: jest.fn()
}))

describe('getNotificationByPartner', () => {
  
    it('should call findAll method', async () => {
      const bussiness_id = 'bussiness_id'
      Notifications.findAll.mockImplementationOnce(() => Promise.resolve())
      await getNotificationByPartner(bussiness_id)
  
      expect(Notifications.findAll).toHaveBeenCalled()
    })
})
