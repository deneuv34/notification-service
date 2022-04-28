'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('Notifications', {
        id: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
        },
        business_id: {
          type: Sequelize.STRING,
        },
        merchant_end_customer_id: {
          type: Sequelize.STRING
        },
        partner_trx_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        amount: {
          type: Sequelize.FLOAT
        },
        transaction_timestamp: {
          allowNull: false,
          type: Sequelize.DATE
        },
        retry_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        notified_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        version: {
          type: Sequelize.INTEGER,
          allowNull: true
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
          allowNull: true
        }
      }, { transaction });
  
      await queryInterface.addIndex('Notifications', ['business_id'], { 
        fields: 'business_id',
        unique: false,
        transaction,
      });
      await queryInterface.addIndex('Notifications', ['partner_trx_id'], { 
        fields: 'partner_trx_id',
        unique: false,
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notifications');
  }
};