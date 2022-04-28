const { post } = require("superagent");
const postNotificationSchema = require("./schema/postNotification.schema");

const postNotification = (req, res, next) => {
  const { body } = req;
  const validRequest = postNotificationSchema.validate(body);
  if (validRequest.error) {
    res.status(400).json({ error: validRequest.error });
    next()
  }

  next()
}

module.exports = postNotification;
