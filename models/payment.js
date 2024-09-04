const Sequelize = require('sequelize');

const User = require('./user'); 

const sequelize = new Sequelize('Expense-Tracker', 'root', 'MYSQL', {
    host: 'localhost',
    dialect: 'mysql'
  });

const PaymentMethod = sequelize.define('PaymentMethod', {
  payment_method_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  payment_method_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});


PaymentMethod.belongsTo(User, { foreignKey: 'user_id' });

sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('payment model synced successfully');
  })
  .catch(err => {
    console.error('Error syncing payment model:', err);
  });

module.exports = PaymentMethod;



