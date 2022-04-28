const { AUTH_TOKEN } = require("../lib/config");
const logger = require("../lib/logger");
const AuthKeys = require("../models/auth_keys");

const authentication = async (req, res, next) => {
  try {
    const token = req.headers['x-api-key'];
  
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const keyData = await AuthKeys.findOne({ where: { key: token } });

    if (!keyData) return res.status(401).json({ error: "Unauthorized" });
    const validToken = token === keyData.key
  
    if (!validToken) return res.status(401).json({ error: "Unauthorized" });
    next();
  } catch (error) {
    logger.error(`couldn't authenticate the request: ${error.message}`);
    next(error)
  }
}

module.exports = authentication;
