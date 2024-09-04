const Sequelize = require('sequelize');

const User = require('./user.js'); 

const sequelize = new Sequelize('Expense-Tracker', 'root', 'MYSQL', {
    host: 'localhost',
    dialect: 'mysql'
  });

const Expense = sequelize.define('Expense', {
  expense_id: {
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
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(255)
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

Expense.belongsTo(User, { foreignKey: 'user_id' });

sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('expense model synced successfully');
  })
  .catch(err => {
    console.error('Error syncing expense model:', err);
  });

module.exports = Expense;