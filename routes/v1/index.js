const express = require('express');
const { generateApiKey, postNotification, retryNotificaiton, getNotifications } = require('../../controllers');
const setMerchantNotifUrl = require('../../controllers/setMerchantNotifUrl');
const generateApiKeyRequest = require('../../lib/validators/generateApiKeyRequest');
const postNotificationRequest = require('../../lib/validators/postNotificationRequest');
const authentication = require('../../middlewares/authentication');

const route = express.Router()

route.post('/notifications', authentication, postNotificationRequest, postNotification)
route.get('/notifications/:businessId', authentication, getNotifications)
route.post('/generate-key', authentication, generateApiKeyRequest, generateApiKey)
route.get('/notifications/:notificationId/retry', authentication, retryNotificaiton)
route.post('/notifications/url', authentication, setMerchantNotifUrl)

module.exports = route;
