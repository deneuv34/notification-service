const generateApiKeySchema = require("./schema/generateApiKey.schema");

const generateApiKeyRequest = (req, res, next) => {
  const { body } = req;
  const validRequest = generateApiKeySchema.validate(body);
  if (validRequest.error) {
    res.status(400).json({ error: validRequest.error });
    next()
  }

  next()
}

module.exports = generateApiKeyRequest;
