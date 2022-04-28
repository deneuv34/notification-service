const crypto = require('crypto');
const { HASH_SECRET } = require('./const');

const createHash = (id) => {
  // create a md5 hasher
  const md5Hasher = crypto.createHmac("md5", HASH_SECRET);

  // hash the string
  // and set the output format
  return md5Hasher.update(id.toString()).digest("hex");
}

module.exports = createHash
