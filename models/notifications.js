'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const sequelize = require('../database/connectors');

class Notifications extends Model {}

Notifications.init({
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  business_id: DataTypes.STRING,
  merchant_end_customer_id: DataTypes.STRING,
  partner_trx_id: DataTypes.STRING,
  amount: DataTypes.NUMBER,
  transaction_timestamp: DataTypes.DATE,
  retry_at: DataTypes.TIME,
  notified_at: DataTypes.TIME,
}, {
  sequelize,
  modelName: 'Notifications',
  paranoid: true,
  version: true
});

module.exports = Notifications;
