'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('Merchant_Notif_Urls', {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        merchant_id: {
          type: Sequelize.STRING,
          allowNull: false
        },
        merchant_url: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        }
      }, { transaction });
      await queryInterface.addIndex('Merchant_Notif_Urls', ['merchant_id'], {
        fields: 'merchant_id',
        unique: false,
        transaction,
      });
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error;
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Merchant_Notif_Urls');
  }
};