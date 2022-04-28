const { postNotification } = require('../../../controllers');
const { createNotification } = require('../../../services/notifications');
const { findPartnerTransaction } = require('../../../services/partners');

jest.mock('../../../services/notifications/createNotification');
jest.mock('../../../services/partners/findPartnerTransaction');

describe('postNotification', () => {

  it('should call all methods', async () => {
    findPartnerTransaction.mockImplementation(() => Promise.resolve({}))
    createNotification.mockImplementation(() => Promise.resolve());
    await postNotification({ body: { test: 'test' } }, { status: (statusCode) => ({ json: jest.fn() })}, jest.fn())

    expect(createNotification).toHaveBeenCalled()
  })
});
