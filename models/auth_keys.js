'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const sequelize = require('../database/connectors');

class AuthKeys extends Model {
}
AuthKeys.init({
  merchant_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Auth_Keys',
  paranoid: true,
});

module.exports = AuthKeys