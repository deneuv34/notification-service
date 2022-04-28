const { retryNotificaiton } = require('../../../controllers');
const MerchantNotifURLs = require('../../../models/merchantNotifURLs');
const Notifications = require('../../../models/notifications');
const Partners = require('../../../models/partners');
const { sendNotifToMerchant } = require('../../../services/notifications');


jest.mock('../../../models/notifications', () => ({
  findOne: jest.fn(),
  update: jest.fn()
}));
jest.mock('../../../models/merchantNotifURLs', () => ({
  findOne: jest.fn()
}));
jest.mock('../../../models/partners', () => ({
  findOne: jest.fn()
}));
jest.mock('../../../controllers/getNotification');
jest.mock('../../../services/notifications/sendNotifToMerchant');


describe('retryNotification', () => {

  it('should call all methods', async () => {
    Notifications.findOne.mockImplementation(() => Promise.resolve({
      business_id: 'test',
    }))
    MerchantNotifURLs.findOne.mockImplementation(() => Promise.resolve({
      merchant_id: 'test',
      merchant_url: 'http://test.com/notifications',
    }))
    Partners.findOne.mockImplementation(() => Promise.resolve({ merchant_id: 'test', merchant_url: 'http://test.com' }))
    sendNotifToMerchant.mockImplementation(() => Promise.resolve());
    await retryNotificaiton({ params: { notificationId: 'test'} }, { status: (statusCode) => ({ json: jest.fn() })}, jest.fn())

    expect(MerchantNotifURLs.findOne).toHaveBeenCalled()
    expect(Notifications.update).toHaveBeenCalled()
    expect(Partners.findOne).toHaveBeenCalled()
    expect(sendNotifToMerchant).toHaveBeenCalled()
  })
})